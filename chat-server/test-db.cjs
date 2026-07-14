const pool = require('./src/config/db');

async function test() {
  try {
    const time = await pool.query('SELECT NOW() as now');
    console.log('✅ DB Connected:', time.rows[0].now);

    const tables = await pool.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('messages', 'channels', 'reactions', 'chat_users', 'dating_profiles', 'swipes', 'matches')
      ORDER BY tablename
    `);
    console.log('📋 Tables found:', tables.rows.map(r => r.tablename));

    const channels = await pool.query('SELECT * FROM channels');
    console.log('📺 Channels:', channels.rows.length, 'rows');
    console.log(channels.rows);

  } catch (e) {
    console.error('❌ Error:', e.message);
    console.error(e);
  } finally {
    await pool.end();
  }
}

test();