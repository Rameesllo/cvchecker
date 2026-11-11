import React from 'react';

const scoreLabels = [
  ['ATS compatibility', 'atsScore'],
  ['Skills', 'skillsScore'],
  ['Experience', 'experienceScore'],
  ['Projects', 'projectsScore'],
  ['Education', 'educationScore'],
  ['Communication', 'communicationScore']
];

const checkLabels = [
  ['missingContactInfo', 'Contact information'],
  ['missingGithub', 'GitHub profile'],
  ['missingLinkedin', 'LinkedIn profile'],
  ['missingSkills', 'Skills section'],
  ['missingProjects', 'Projects section'],
  ['missingExperience', 'Work experience'],
  ['missingEducation', 'Education details'],
  ['weakProjectDescriptions', 'Project descriptions'],
  ['repetitiveActionVerbs', 'Action verbs'],
  ['poorFormatting', 'Resume formatting'],
  ['atsCompatibility', 'ATS compatibility']
];

const FeedbackList = ({ title, items }) => (
  <section className="rounded-xl border border-slate-200 p-5">
    <h2 className="font-semibold text-slate-900">{title}</h2>
    {items.length > 0 ? (
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
        {items.map((item, index) => <li key={`${title}-${index}`}>{item}</li>)}
      </ul>
    ) : (
      <p className="mt-3 text-sm text-slate-500">No items to show.</p>
    )}
  </section>
);

const Dashboard = ({ result, setCurrentPage }) => {
  if (!result) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900">No resume analysis yet</h1>
        <p className="mt-2 text-slate-600">Upload a resume to see your feedback.</p>
        <button
          type="button"
          onClick={() => setCurrentPage('upload')}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Upload resume
        </button>
      </section>
    );
  }

  const {
    overallScore = 0,
    checks = {},
    strengths = [],
    weaknesses = [],
    suggestions = [],
    recommendedChanges = [],
    resumeUrl
  } = result;

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Resume feedback</h1>
          <p className="mt-2 text-slate-600">A quick overview of your resume.</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage('upload')}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Check another
          </button>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              View file
            </a>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 p-5">
        <p className="text-sm font-medium text-slate-500">Overall score</p>
        <p className="mt-1 text-4xl font-bold text-blue-700">{overallScore}<span className="text-xl">/100</span></p>
      </div>

      <section>
        <h2 className="font-semibold text-slate-900">Category scores</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {scoreLabels.map(([label, key]) => (
            <div key={key} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-700">{label}</span>
              <span className="font-semibold text-slate-900">{result[key] ?? 0}/100</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-slate-900">Resume checklist</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {checkLabels.map(([key, label]) => {
            const passed = key === 'atsCompatibility' ? checks[key] : !checks[key];
            return (
              <li key={key} className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className={passed ? 'mr-2 text-green-700' : 'mr-2 text-red-700'}>
                  {passed ? 'Pass' : 'Review'}
                </span>
                {label}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <FeedbackList title="Strengths" items={strengths} />
        <FeedbackList title="Areas to improve" items={weaknesses} />
        <FeedbackList title="Suggestions" items={suggestions} />
        <FeedbackList title="Recommended edits" items={recommendedChanges} />
      </div>
    </section>
  );
};

export default Dashboard;
