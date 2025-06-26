<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
</head>
<body>
    <h2>Trả lời từ Citizens</h2>
    <p>Xin chào {{ $contact->name }},</p>
    <p>Cảm ơn bạn đã liên hệ với chúng tôi. Dưới đây là phản hồi của chúng tôi:</p>
    <p><strong>Nội dung phản hồi:</strong> {{ $replyMessage }}</p>
    <p><strong>Liên hệ của bạn:</strong></p>
    <ul>
        <li><strong>Tên:</strong> {{ $contact->name }}</li>
        <li><strong>Email:</strong> {{ $contact->email }}</li>
        <li><strong>Thông điệp:</strong> {{ $contact->message }}</li>
    </ul>
    <p>Trân trọng,</p>
    <p>Đội ngũ Citizens</p>
</body>
</html>