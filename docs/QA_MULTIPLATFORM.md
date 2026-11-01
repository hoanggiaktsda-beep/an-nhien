# AN NHIÊN V0.4 — Cross-platform QA

- Default scene is the poetic SVG illustration on all platforms. Experimental GLB/3D is opt-in. Architectural GLB remains unchanged.
- Three locally hosted MP3 tracks replace quiet Web Audio noise: synthesized rain, water/bird and night ambience. Native audio controls, 65% initial volume, explicit play gesture, playback/error events and track switching.
- Desktop dock; tablet two-column controls; phone thumb bar + expandable settings; landscape scrollable side panel; safe-area padding; dynamic viewport height; 44px primary touch controls.
- Browser viewport tests: 390x844, 768x1024, 844x390 all document dimensions equal viewport dimensions (no overflow). Phone screenshot reviewed, settings panel visible and reachable.
- Audio playback verified via native media element: readyState 4, paused false, duration 16s and advancing currentTime; changing mood switches source while continuing playback. Rechecked MP3 after conversion.
- Browser layout tests are not physical iPhone/iPad or iOS audio tests. Acoustic quality cannot be certified by media state alone.
