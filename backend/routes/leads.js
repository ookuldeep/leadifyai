const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const fetch = require('node-fetch');

require('dotenv').config();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  console.log("📥 Received lead:", { name, email, message });

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 🔍 AI scoring prompt
  const prompt = `Classify this sales lead as Hot, Warm, or Cold:\n\n"${message}"\n\nRespond with one word only.`;
  let score = 'Unknown';

  try {
    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5000',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that scores lead quality.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const aiData = await aiResponse.json();
    const raw = aiData?.choices?.[0]?.message?.content?.trim().toLowerCase();

    if (typeof raw === "string") {
      if (raw.includes("hot")) score = "Hot";
      else if (raw.includes("warm")) score = "Warm";
      else if (raw.includes("cold")) score = "Cold";
    } else {
      console.warn("⚠️ AI response was undefined or invalid:", raw);
    }

    console.log("🤖 AI Score:", score);
  } catch (err) {
    console.error("⚠️ AI fetch error:", err.message);
  }

  // ✅ Insert lead with AI score into Supabase
  const { error } = await supabase
    .from('leads')
    .insert([{ name, email, message, score }], { returning: 'minimal' });

  if (error) {
    console.error('❌ Supabase insert error:', error);
    return res.status(500).json({ error: 'Database insert failed' });
  }

  console.log("✅ Lead saved to Supabase.");
  res.status(200).json({ message: 'Lead saved with AI score!' });
});

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error("❌ Supabase fetch error:", error);
      return res.status(500).json({ error: 'Failed to fetch leads' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    console.error("❌ Delete error:", error);
    return res.status(500).json({ error: "Failed to delete lead" });
  }

  res.status(200).json({ message: "Lead deleted" });
});

