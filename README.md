<head>
    <link rel="stylesheet" href="src/styles/styles.css">
    <link href="https://fonts.cdnfonts.com/css/crimson-pro" rel="stylesheet">
    <link href="https://fonts.cdnfonts.com/css/garamond" rel="stylesheet">
    <script type="text/javascript" src="src/js/main.js" defer></script>
</head>
<h1>coffeestained.github.io</h1>
<hr>
A small PDF generator for a friend at Sugar Tree.

<h2>To use:</h2>
<hr>
Use the tools to add your header image, items, and footer image. Click export when you're happy with the preview.

Whatever is in the preview will be exported as PDF format.

<h2>Tools:</h2>
<hr>
<div class="tools">
    <div class="tool-input">
        <span>Total Pages</span>
        <input id="numPages" type="number" value="1" disabled>
    </div>
    <div class="tool-input">
        <span>Page Padding</span>
        <input id="padding" type="number" value="15" min="5" max="100">
    </div>
    <div class="tool-button" onclick="addImage()">
        Add Image Row
    </div>
    <div class="tool-button" onclick="addText()">
        Add Text Row
    </div>
    <div class="tool-button">
        Add Product Row
    </div>
</div>

<h2>Preview Container:</h2>
<hr>
<div id="pages">
    <div id="page-1" class="page">

    </div>
</div>
