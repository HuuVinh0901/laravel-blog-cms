<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Mail\ContactReplyMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $contacts,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'message' => 'required|string|max:2000',
        ]);

        $contact = Contact::create($validated);

        Mail::to('phamhuuvinh912003@gmail.com')->send(new ContactMail($contact));
        return response()->json([
            'success' => true,
            'message' => 'Liên hệ đã được gửi thành công!',
        ]);
    }
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Liên hệ đã được xóa thành công!',
        ]);
    }
    public function reply(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $validated = $request->validate([
            'reply_message' => 'required|string|max:2000',
        ]);

        Mail::to($contact->email)->send(new ContactReplyMail($contact, $validated['reply_message']));

        $contact->update(['replied' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Phản hồi email đã được gửi thành công!',
        ]);
    }
}
