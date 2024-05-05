class MarkdownParser {
    constructor() {
        this.rules = [
            { pattern: /^# (.+)$/gm, replacement: '<h1>$1</h1>' },
            { pattern: /^## (.+)$/gm, replacement: '<h2>$1</h2>' },
            { pattern: /^### (.+)$/gm, replacement: '<h3>$1</h3>' },
            { pattern: /^#### (.+)$/gm, replacement: '<h4>$1</h4>' },
            { pattern: /^##### (.+)$/gm, replacement: '<h5>$1</h5>' },
            { pattern: /^###### (.+)$/gm, replacement: '<h6>$1</h6>' },
            { pattern: /^- (.+)$/gm, replacement: '<li>$1</li>' },
            { pattern: /^\* (.+)$/gm, replacement: '<li>$1</li>' },
            { pattern: /^([^\n].+)$/gm, replacement: '<p>$1</p>' },
            { pattern: /\*\*(.+?)\*\*/gm, replacement: '<strong>$1</strong>' },
            { pattern: /__(.+?)__/gm, replacement: '<strong>$1</strong>' },
            { pattern: /\*(.+?)\*/gm, replacement: '<em>$1</em>' },
            { pattern: /_(.+?)_/gm, replacement: '<em>$1</em>' },
            { pattern: /\[([^\]]+?)\]\(([^)]+?)\)/gm, replacement: '<a href="$2">$1</a>' }
        ];
    }

    parse(markdownText) {
        let htmlText = markdownText;
        this.rules.forEach(rule => {
            htmlText = htmlText.replace(rule.pattern, rule.replacement);
        });
        return htmlText;
    }
}

function parseMarkdown() {
    const markdownInput = document.getElementById('markdownInput').value;
    const parser = new MarkdownParser();
    const htmlOutput = parser.parse(markdownInput);
    document.getElementById('htmlOutput').innerHTML = htmlOutput;
}

function applyMarkdown(startTag, endTag) {
    const textarea = document.getElementById('markdownInput');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + startTag + selectedText + endTag + text.substring(end);
    textarea.value = newText;
    parseMarkdown();
}
