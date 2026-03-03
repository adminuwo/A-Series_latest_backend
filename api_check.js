fetch('http://localhost:8080/api/agents')
    .then(res => res.json())
    .then(data => {
        const found = data.filter(d => /aihire/i.test(d.agentName) || /aisales/i.test(d.agentName) || /ai hire/i.test(d.agentName) || /ai sales/i.test(d.agentName));
        console.log("Filtered Agents:", JSON.stringify(found, null, 2));
    })
    .catch(console.error);
