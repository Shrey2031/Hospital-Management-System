import React from 'react';

const feedbacks = [
  {
    id: 1,
    name: 'Alice Johnson',
    feedback: 'This health record system transformed how I manage my wellness daily. Highly recommended!',
    role: 'Patient',
    avatarUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9703b60a-a81b-440e-b0c9-427387a93821.png',
  },
  {
    id: 2,
    name: 'Dr. Mark Lee',
    feedback: 'Intuitive, powerful, and secure — an essential tool for any healthcare professional.',
    role: 'Cardiologist',
    avatarUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b74f0c4c-50a0-45f7-bbcd-f1e391df75c9.png',
  },
  {
    id: 3,
    name: 'Emily Carter',
    feedback: 'Seamless access to my records and progress tracking made a positive impact on my health journey.',
    role: 'Fitness Enthusiast',
    avatarUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1969d8b6-5232-44c2-87dd-94b8d334a232.png',
  },
];

export default function HealthRecordBannerSection() {
  return (
    <section
      aria-labelledby="banner-title"
      className="bg-gradient-to-tr from-sky-200 via-blue-100 to-white py-16 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="banner-title"
          className="text-4xl font-extrabold text-sky-700 text-center mb-12"
        >
          What People Are Saying About Our Health Record System
        </h2>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {feedbacks.map(({ id, name, feedback, role, avatarUrl }) => (
            <article
              key={id}
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
            >
              <img
                src={avatarUrl}
                alt={`Photo of ${name}, ${role}`}
                className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-sky-400 shadow-md"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5b1f5a8f-ed36-43e4-b78f-141189803706.png';
                }}
              />
              <p className="text-blue-800 italic mb-6 text-lg leading-relaxed">&ldquo;{feedback}&rdquo;</p>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">{name}</h3>
                <p className="text-sky-600 font-medium">{role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


