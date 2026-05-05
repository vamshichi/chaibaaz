'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    guestCount: '',
    dietaryPreferences: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      serviceType: '',
      date: '',
      time: '',
      guestCount: '',
      dietaryPreferences: '',
      specialRequests: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-foreground" />
          </div>
        </motion.div>

        <h3 className="text-3xl font-light text-foreground mb-3">
          Booking Request Received!
        </h3>
        <p className="text-secondary mb-8 max-w-md mx-auto">
          Thank you for choosing Chaibaaz. We&apos;ll be in touch within 24 hours to confirm your booking details.
        </p>

        <button
          onClick={handleReset}
          className="px-8 py-3 bg-accent text-foreground rounded-lg font-medium hover:bg-muted transition-all"
        >
          Book Another Event
        </button>
      </motion.div>
    );
  }

  const steps = [
    {
      title: 'Select Service',
      content: (
        <div className="space-y-4">
          {[
            { value: 'chai-cart', label: 'Chai Cart' },
            { value: 'event-catering', label: 'Event Catering' },
            { value: 'custom-blend', label: 'Custom Blend' },
            { value: 'workshop', label: 'Workshop' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-accent transition-colors"
            >
              <input
                type="radio"
                name="serviceType"
                value={option.value}
                checked={formData.serviceType === option.value}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <span className="ml-3 text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: 'Event Date & Time',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-foreground font-medium mb-2">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
            />
          </div>
          <div>
            <label className="block text-foreground font-medium mb-2">
              Event Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Guest Information',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-foreground font-medium mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={handleInputChange}
              placeholder="e.g., 50"
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
            />
          </div>
          <div>
            <label className="block text-foreground font-medium mb-2">
              Dietary Preferences
            </label>
            <textarea
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleInputChange}
              placeholder="e.g., Vegan, Dairy-free, Caffeine-free"
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
              rows={3}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Special Requests',
      content: (
        <div className="space-y-4">
          <label className="block text-foreground font-medium mb-2">
            Any Special Requests?
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Tell us about your vision, theme, or any special requirements..."
            className="w-full px-4 py-3 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
            rows={5}
          />
        </div>
      ),
    },
    {
      title: 'Contact Information',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-foreground font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
            />
          </div>
          <div>
            <label className="block text-foreground font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
            />
          </div>
          <div>
            <label className="block text-foreground font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-accent focus:outline-none bg-card"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Review & Confirm',
      content: (
        <div className="space-y-4 text-sm">
          <div className="p-4 bg-card rounded-lg">
            <p className="text-foreground font-medium mb-2">Service Type</p>
            <p className="text-secondary capitalize">{formData.serviceType}</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="text-foreground font-medium mb-2">Date & Time</p>
            <p className="text-secondary">{formData.date} at {formData.time}</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="text-foreground font-medium mb-2">Guest Count</p>
            <p className="text-secondary">{formData.guestCount} guests</p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <p className="text-foreground font-medium mb-2">Contact</p>
            <p className="text-secondary">{formData.name}</p>
            <p className="text-secondary">{formData.email}</p>
            <p className="text-secondary">{formData.phone}</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 mx-1 rounded-full transition-colors ${
                index < step ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-secondary text-center">
          Step {step} of {steps.length}
        </p>
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-2xl font-light text-foreground mb-6">
          {steps[step - 1].title}
        </h3>
        {steps[step - 1].content}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={step === 1}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent text-foreground rounded-lg font-medium hover:bg-muted transition-all"
        >
          {step === steps.length ? 'Submit Booking' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
