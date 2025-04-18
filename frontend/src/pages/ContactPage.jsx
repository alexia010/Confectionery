// ContactPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const ContactPage = () => {
  return (
    <MainLayout>
    <div className="min-h-screen bg-gray-50 font-sans">


      {/* Main Content */}
      <main className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-brown-700 mb-6 text-center">Contactează-ne</h2>
        <p className="text-gray-600 mb-8 text-center">
          Ai o întrebare sau vrei să plasezi o comandă? Completează formularul de mai jos sau contactează-ne direct!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <form action="mailto:contact@gustdivin.ro" method="post" encType="text/plain" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nume</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesaj</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-pink-400 focus:border-pink-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-500 transition"
              >
                Trimite mesaj
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-brown-700">Informații de contact</h3>
            <p className="text-gray-600"><strong>Adresă:</strong> Str. Dulce 123, București, România</p>
            <p className="text-gray-600"><strong>Telefon:</strong> +40 123 456 789</p>
            <p className="text-gray-600"><strong>Email:</strong> contact@gustdivin.ro</p>
            <p className="text-gray-600"><strong>Program:</strong> Luni - Vineri: 9:00 - 18:00, Sâmbătă: 10:00 - 14:00, Duminică: Închis</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-brown-700 text-white text-center py-4">
        <p>&copy; 2025 Gust Divin. Toate drepturile rezervate.</p>
      </footer>
    </div>
    </MainLayout>
  );
};

export default ContactPage;