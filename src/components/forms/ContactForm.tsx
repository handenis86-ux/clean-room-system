'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }

      setIsSuccess(true);
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError('Произошла ошибка при отправке. Попробуйте позже или свяжитесь с нами по телефону.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-brand-700" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
        <p className="text-gray-500">
          Наш менеджер свяжется с вами в ближайшее время
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Ваше имя"
          placeholder="Иван Иванов"
          {...register('name', { required: 'Введите ваше имя' })}
          error={errors.name?.message}
          required
        />
        <Input
          label="Телефон"
          type="tel"
          placeholder="+7 (999) 123-45-67"
          {...register('phone', {
            required: 'Введите номер телефона',
            pattern: {
              value: /^[\d\s\+\-\(\)]+$/,
              message: 'Некорректный номер телефона',
            },
          })}
          error={errors.phone?.message}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Email"
          type="email"
          placeholder="email@company.ru"
          {...register('email', {
            required: 'Введите email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
          error={errors.email?.message}
          required
        />
        <Input
          label="Компания"
          placeholder="ООО «Компания»"
          {...register('company')}
        />
      </div>

      <Textarea
        label="Сообщение"
        placeholder="Опишите ваш запрос или задайте вопрос..."
        rows={4}
        {...register('message', {
          required: 'Введите сообщение',
          minLength: { value: 10, message: 'Сообщение слишком короткое' },
        })}
        error={errors.message?.message}
        required
      />

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-gray-400">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <a href="/privacy" className="text-brand-700 hover:underline">
            политикой конфиденциальности
          </a>
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Отправка...
            </>
          ) : (
            'Отправить заявку'
          )}
        </Button>
      </div>
    </form>
  );
}
