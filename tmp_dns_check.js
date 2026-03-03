import dns from 'dns';
const srvName = '_mongodb._tcp.cluster0.selr4is.mongodb.net';
dns.resolveSrv(srvName, (err, addresses) => {
    if (err) {
        console.error('Resolution Error:', err);
        process.exit(1);
    }
    console.log('SRV Addresses:', JSON.stringify(addresses, null, 2));
});
