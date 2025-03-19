async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    function sanitize(input) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
        const reg = /[&<>"']/g;
        return input.replace(reg, (match) => map[match]);
    }

    const cliente = sanitize(document.getElementById('cliente').value.trim());
    const produto = sanitize(document.getElementById('produto').value.trim());
    const dataCompra = sanitize(document.getElementById('dataCompra').value.trim());
    const validade = sanitize(document.getElementById('validade').value.trim());
    const numeroSerie = sanitize(document.getElementById('numeroSerie').value.trim()) || 'N/A';
    const imei = sanitize(document.getElementById('imei').value.trim()) || 'N/A';
    const termos = sanitize(document.getElementById('termos').value.trim());
    const contato = sanitize(document.getElementById('contato').value.trim());

    const dataAtual = new Date();
    const dataImpressao = `${dataAtual.toLocaleDateString()} ${dataAtual.toLocaleTimeString()}`;

    // Validação mais rigorosa
    if (!cliente || !produto || !dataCompra || !validade || !termos || !contato) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // PDF Content
    doc.setFontSize(22);
    doc.setTextColor(0, 102, 204);
    doc.text("Nota de Garantia", 10, 20);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Cliente: ${cliente}`, 10, 30);
    doc.text(`Produto: ${produto}`, 10, 40);
    doc.text(`Data da Compra: ${dataCompra}`, 10, 50);
    doc.text(`Validade: ${validade}`, 10, 60);
    doc.text(`Número de Série: ${numeroSerie}`, 10, 70);
    doc.text(`IMEI: ${imei}`, 10, 80);

    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text("Termos e Condições:", 10, 90);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(termos, 10, 100, { maxWidth: 180 });

    doc.setFontSize(12);
    doc.setTextColor(0, 102, 204);
    doc.text(`Contato para Suporte:`, 10, 160);

    doc.setTextColor(0);
    doc.text(contato, 10, 170);

    doc.setFontSize(12);
    doc.text("Assinatura do Vendedor: ____________________________", 10, 190);
    doc.text("Assinatura do Cliente: _____________________________", 10, 200);

    doc.setFontSize(10);
    doc.text(`Nota impressa em: ${dataImpressao}`, 10, 210);

    const nomeArquivo = `NotaGarantia_${cliente.replace(/\s+/g, '_')}.pdf`;
    doc.save(nomeArquivo);
}
