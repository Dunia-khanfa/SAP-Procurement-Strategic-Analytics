function openExpertTool(type) {
    const newTab = window.open("", "_blank");
    
    const toolConfig = {
        srm: {
            h: "SRM - Vendor Reliability Analysis",
            desc: "Calculate reliability based on SAP delivery history.",
            labels: ["Total Orders", "Delayed/Defective"],
            defaults: [1000, 50],
            calc: (a, b) => `Reliability Score: ${((a-b)/a*100).toFixed(1)}%`
        },
        cash: {
            h: "Payment Terms Optimization",
            desc: "Calculate liquidity boost from extending vendor credit days.",
            labels: ["Annual Spend ($)", "Days Extended"],
            defaults: [1200000, 30],
            calc: (a, b) => `Working Capital Freed: $${Math.round((a/365)*b).toLocaleString()}`
        },
        dead: {
            h: "Dead-Stock Valuation",
            desc: "Identify financial loss from non-moving items (180+ days).",
            labels: ["Dead Stock Value ($)", "Annual Holding Cost %"],
            defaults: [80000, 20],
            calc: (a, b) => `Annual Capital Loss: $${(a * (b/100)).toLocaleString()}`
        },
        safety: {
            h: "Inventory Risk Planning",
            desc: "Calculate safety stock levels to prevent production downtime.",
            labels: ["Avg Daily Usage", "Max Lead-Time (Days)"],
            defaults: [150, 10],
            calc: (a, b) => `Required Safety Stock: ${(a * b).toLocaleString()} Units`
        },
        maverick: {
            h: "Contract Compliance Monitor",
            desc: "Calculate savings leakage from off-contract purchasing.",
            labels: ["Off-Contract Spend ($)", "Target Discount %"],
            defaults: [400000, 12],
            calc: (a, b) => `Annual Savings Leakage: $${(a * (b/100)).toLocaleString()}`
        }
    }[type];

    newTab.document.write(`
        <html>
        <head>
            <title>${toolConfig.h}</title>
            <style>
                body { font-family: sans-serif; background: #1a2a6c; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 50px; border-radius: 20px; width: 420px; text-align: center; }
                input { width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ddd; border-radius: 8px; }
                button { background: #0070d2; color: white; border: none; padding: 15px; width: 100%; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px; }
                .auto-btn { background: #f0f4f8; color: #0070d2; font-size: 11px; padding: 5px; margin-bottom: 10px; border: none; cursor:pointer; }
                .res { margin-top: 20px; padding: 20px; background: #fdbb2d; color: #1a2a6c; border-radius: 10px; font-weight: bold; display: none; font-size: 18px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>${toolConfig.h}</h2>
                <p style="font-size:14px; color:#666">${toolConfig.desc}</p>
                <input type="number" id="valA" placeholder="${toolConfig.labels[0]}">
                <input type="number" id="valB" placeholder="${toolConfig.labels[1]}">
                <button class="auto-btn" onclick="document.getElementById('valA').value=${toolConfig.defaults[0]}; document.getElementById('valB').value=${toolConfig.defaults[1]}">Load SAP Example Data</button>
                <button onclick="run()">Execute Analysis</button>
                <div id="r" class="res"></div>
            </div>
            <script>
                function run() {
                    const a = parseFloat(document.getElementById('valA').value);
                    const b = parseFloat(document.getElementById('valB').value);
                    const logic = ${toolConfig.calc.toString()};
                    document.getElementById('r').innerHTML = logic(a, b);
                    document.getElementById('r').style.display = 'block';
                }
            <\/script>
        </body>
        </html>
    `);
}