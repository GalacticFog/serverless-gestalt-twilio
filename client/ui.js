module.exports = function getHtml() {
  return `<!DOCTYPE html>
    <head>
        <title>Send SMS Message</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    </head>
    <body class="bg-light">
        <div class="container">
            <div class="row" style="margin:100px;">
                <h2>Send message</h2>
                <textarea id="message" placeholder="Message" autofocus="autofocus" onblur="messageBlur()" onfocus="messageFocused()" class="form-control" style="margin-bottom:16px; min-width:150px;"></textarea>
                <button onclick="sendClick()" class="btn btn-primary" style="width:150px;">Send</button>

                <div id="status" class="alert" role="alert" style="margin-left:32px; margin: 1em;"></div>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script>
            function messageFocused() {
                $('#status').text('');
                $('#status').hide();
            }

            function showStatus(text, status) {
              $('#status').text('');
              $('#status').addClass(status || 'alert-info');
              $('#status').text(text);
              $('#status').show();
            }

            function sendClick() {
                var message = $('#message').val();

                if (!message) {
                    showStatus('Write Some Text!')
                    return;
                }

                showStatus('Sending...');

                var url = '';
                $.post(url, JSON.stringify({ message: message }), function (data, error) {
                  showStatus(data);
                }).fail(
                    function (error) {
                      showStatus('Error code: ' + error.status);
                    });
            }

        </script>
    </body>
    </html>
  `;
}
