import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3030;

// Serve static files
app.use(express.static(__dirname));

// Root route
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('\n' + '='.repeat(60));
    console.log('MIDI BRIDGE - Standalone MIDI Forwarder');
    console.log('='.repeat(60));
    console.log(`\n✓ Server running at: http://localhost:${PORT}`);
    console.log(`✓ Network access: http://<your-ip>:${PORT}`);
    console.log('\nUsage:');
    console.log('  1. Open this page in browser');
    console.log('  2. Grant MIDI access when prompted');
    console.log('  3. Connect to MeisterRTC Bridge');
    console.log('  4. MIDI devices will forward to network');
    console.log('\n' + '='.repeat(60) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\nShutting down MIDI Bridge...');
    server.close(() => {
        console.log('✓ Server closed');
        process.exit(0);
    });
});
