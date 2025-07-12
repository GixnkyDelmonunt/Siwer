function removeComments() {
    var luaCode = document.getElementById('inputCode').value;
    luaCode = luaCode.replace(/--\[\[[\s\S]*?\]\]/g, '');
    var lines = luaCode.split('\n');
    var resultLines = lines.map(function (line) {
        var trimmedLine = line.trim();
        if (trimmedLine.startsWith('--')) {
            return null;
        }
        var commentIndex = line.indexOf('--');
        if (commentIndex !== -1) {
            return line.slice(0, commentIndex);
        }
        return line;
    });
    luaCode = resultLines
        .filter(line => line !== null)
        .join('\n');
    luaCode = luaCode.replace(/\n{3,}/g, '\n\n');
    document.getElementById('output').textContent = luaCode.trim();
}

function copyToClipboard() {
    var outputText = document.getElementById('output').textContent;
    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = outputText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    var copyButton = document.getElementById('copyButton');
    copyButton.textContent = '✔';
    copyButton.classList.add('checking');
    setTimeout(function() {
        copyButton.textContent = 'Copy';
        copyButton.classList.remove('checking');
    }, 1000);
}
