import React, { useState, useEffect } from 'react';
import Loading from '../../shared/components/Loading';
import { getAllContacts, deleteContact, replyContacts } from '../../shared/api/apiClient'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyContact, setReplyContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllContacts();
        setContacts(response.data.data || []);
      } catch (err) {
        setError('Không thể tải danh sách liên hệ');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
      setShowDeleteConfirm(null);
      toast.success('Xóa liên hệ thành công!');
    } catch (err) {
      console.error(err);
      toast.error('Xóa thất bại. Vui lòng thử lại!');
    }
  };

  const handleViewDetail = (contact) => {
    setSelectedContact(contact);
  };

  const handleReplyContact = (contact) => {
    if (!contact.replied) {
      setReplyContact(contact);
      setReplyMessage('');
    }
  };

  const handleSendReply = async () => {
    setIsSending(true); 
    try {
      await replyContacts(replyContact.id, { reply_message: replyMessage });
      setContacts(
        contacts.map((contact) =>
          contact.id === replyContact.id ? { ...contact, replied: true } : contact
        )
      );
      setReplyContact(null);
      setReplyMessage('');
      toast.success('Phản hồi email đã được gửi thành công!');
    } catch (err) {
      setError('Không thể gửi phản hồi');
      console.error(err);
      toast.error('Gửi phản hồi thất bại. Vui lòng thử lại!');
    } finally {
      setIsSending(false); // Kết thúc gửi, tắt trạng thái
    }
  };

  const truncateContent = (content, maxLength = 50) => {
    return content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Quản Lý Liên Hệ</h1>

        {/* Thanh tìm kiếm */}
        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Modal chi tiết */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chi Tiết Liên Hệ</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Tên:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> {selectedContact.email}</p>
                <p><strong>Nội dung:</strong> {selectedContact.message}</p>
                <p><strong>Ngày gửi:</strong> {new Date(selectedContact.created_at).toLocaleString()}</p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal phản hồi */}
        {replyContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Phản hồi đến {replyContact.name}</h2>
              <div className="space-y-4">
                <p><strong>Email:</strong> {replyContact.email}</p>
                <p><strong>Nội dung:</strong> {replyContact.message}</p>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Nhập phản hồi của bạn..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setReplyContact(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-2 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={isSending}
                  className={`px-4 py-2 rounded-lg ${isSending ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {isSending ? 'Đang gửi...' : 'Gửi'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal xác nhận xóa */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Xác nhận xóa</h2>
              <p className="mb-4">Bạn có chắc muốn xóa liên hệ này không?</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDeleteContact(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bảng danh sách liên hệ */}
        <div className="overflow-x-auto">
          <div className="max-h-[550px] overflow-y-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Tên</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Nội dung</th>
                  <th className="p-3 text-left">Ngày gửi</th>
                  <th className="p-3 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{contact.name}</td>
                    <td className="p-3">{contact.email}</td>
                    <td className="p-3">
                      {truncateContent(contact.message)}
                      <button
                        onClick={() => handleViewDetail(contact)}
                        className="ml-2 text-blue-500 hover:underline"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                    <td className="p-3">{new Date(contact.created_at).toLocaleString()}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleReplyContact(contact)}
                        className={`px-3 py-1 rounded-lg transition ${contact.replied ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        disabled={contact.replied}
                      >
                        Phản hồi
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(contact.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ContactManagement;