
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button'; // Importăm butonul tău
import AuthInput from './ui/AuthInput';
import AuthCheckbox from './ui/AuthCheckbox';

const AuthForm = ({ 
  mode, 
  formData, 
  errors, 
  isLoading, 
  handleChange, 
  handleSubmit, 
  toggleMode 
}) => {
  return (
    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-5 gap-0 rounded-xl shadow-lg overflow-hidden border border-[#D7BFA8]/30">
      {/* Coloana stânga: Imagine și text */}
      <div className="md:block md:col-span-2 bg-[#F5A9B8]/10 p-8 flex flex-col justify-center items-center pl-20">
        <img 
          src="/cupcakes.png" 
          alt="Desert Gust Divin" 
          className="w-48 h-48 object-cover rounded-full border-4 border-[#D7BFA8]/50 shadow-md "
        />
        <p className="mt-4 pr-10 text-[#A35D3A] font-serif italic text-center text-sm">
          „Un gust care te răsfață!”
        </p>
      </div>


      {/* Coloana dreapta: Formular */}
      <div className="md:col-span-3 p-8 bg-white flex flex-col justify-center">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif text-[#7B4D2B] relative inline-block">
            {mode === 'login' ? 'Bun venit!' : 'Alătură-te!'}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#F5A9B8] rounded-full"></span>
          </h2>
          <p className="mt-2 text-[#A35D3A] text-sm font-light">
            {mode === 'login' ? 'Intră și savurează magia Gust Divin' : 'Creează-ți contul pentru o experiență dulce'}
          </p>
        </div>
     
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <AuthInput
              id="name"
              name="name"
              type="text"
              label="Numele tău"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="ex: Ion Popescu"
            />
          )}
          
          <AuthInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="ex: email@exemplu.com"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AuthInput
              id="password"
              name="password"
              type="password"
              label="Parolă"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder=""
            />
            
            {mode === 'register' && (
              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirmă parola"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder=""
              />
            )}
          </div>

           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            {mode === 'register' && (
              <AuthCheckbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                error={errors.agreeTerms}
                label={
                  <>
                   
                    Sunt de acord cu{' '}
          
                    <Link to="/termeni" className="text-[#000000] hover:text-[#7B4D2B] font-medium" style={{ all: "unset" }}>
                      Termenii și Condițiile
                    </Link>
                  </>
                }
              />
            )}
          </div>

          {errors.submit && (
            <div className="bg-transparent p-3 rounded-md border-none">
              <p className="text-sm text-[#A35D3A]">{errors.submit}</p>
            </div>
          )}

          {/* Folosim butonul tău cu varianta 'primary' */}
          <div className="flex justify-center items-center w-auto">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              mode === 'login' ? 'Autentifică-te' : 'Creează contul'
            )}
          </Button>
          </div>

          <div className="flex justify-center items-center w-auto">
          <div className="text-center">
            <p className="text-sm text-[#A35D3A] font-light">
              {mode === 'login' ? 'Nu ai cont?' : 'Ai deja cont?'}
            </p>
            {/* Folosim butonul tău cu varianta 'outline' */}
            <Button
              onClick={toggleMode}
              variant="outline"
              className="mt-2 w-full"
            >
              {mode === 'login' ? 'Creează un cont' : 'Autentifică-te'}
            </Button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;