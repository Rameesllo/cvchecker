import './global.css';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';

const defaultApiHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const API_URL = (process.env.EXPO_PUBLIC_API_URL || `http://${defaultApiHost}:5000/api`)
  .replace(/\/+$/, '');
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];

const requestJson = async (path, options) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof data.error === 'string'
      ? data.error
      : data.error?.message || `Request failed (${response.status}).`;
    throw new Error(message);
  }

  return data;
};

const ActionButton = ({ children, onPress, disabled = false, secondary = false }) => (
  <Pressable
    accessibilityRole="button"
    disabled={disabled}
    onPress={onPress}
    className={`items-center rounded-xl px-5 py-4 ${
      secondary ? 'border border-slate-300 bg-white' : 'bg-blue-600'
    } ${disabled ? 'opacity-50' : 'active:opacity-80'}`}
  >
    <Text className={`text-base font-semibold ${secondary ? 'text-slate-700' : 'text-white'}`}>
      {children}
    </Text>
  </Pressable>
);

const Feedback = ({ title, items = [] }) => (
  <View className="rounded-2xl border border-slate-200 bg-white p-5">
    <Text className="text-lg font-semibold text-slate-900">{title}</Text>
    {items.length ? items.map((item, index) => (
      <Text key={`${title}-${index}`} className="mt-3 text-base leading-6 text-slate-600">
        {'\u2022  '}{item}
      </Text>
    )) : (
      <Text className="mt-3 text-base text-slate-500">Nothing to show yet.</Text>
    )}
  </View>
);

const scoreLabels = [
  ['ATS compatibility', 'atsScore'],
  ['Skills', 'skillsScore'],
  ['Experience', 'experienceScore'],
  ['Projects', 'projectsScore'],
  ['Education', 'educationScore'],
  ['Communication', 'communicationScore'],
];

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const chooseFile = async () => {
    setError('');
    try {
      const selection = await DocumentPicker.getDocumentAsync({
        type: FILE_TYPES,
        copyToCacheDirectory: true,
      });
      if (selection.canceled) return;

      const selectedFile = selection.assets[0];
      if (selectedFile.size != null && selectedFile.size > MAX_FILE_SIZE) {
        setError('Choose a file smaller than 5 MB.');
        return;
      }

      setFile(selectedFile);
      setResult(null);
    } catch (pickerError) {
      setError(pickerError.message || 'Could not open the file picker.');
    }
  };

  const checkResume = async () => {
    if (!file) return;
    setBusy(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/octet-stream',
      });

      const uploaded = await requestJson('/upload-resume', {
        method: 'POST',
        body: formData,
      });
      const analysis = await requestJson('/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: uploaded.text }),
      });
      setResult(analysis);
    } catch (requestError) {
      setError(requestError.message || 'Could not process this resume.');
    } finally {
      setBusy(false);
    }
  };

  const startOver = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="dark" />
      <View className="border-b border-slate-200 bg-white px-6 py-4">
        <Text className="text-lg font-bold text-slate-900">Resume Checker</Text>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="gap-5 px-6 py-8">
        <View>
          <Text className="text-3xl font-bold leading-9 text-slate-900">
            {result ? 'Your resume feedback' : 'Make your next move with confidence.'}
          </Text>
          <Text className="mt-3 text-base leading-6 text-slate-600">
            {result
              ? 'Here are the key scores and suggestions from your resume check.'
              : 'Upload your resume and get clear, practical feedback in just a few steps.'}
          </Text>
        </View>

        {error ? (
          <Text accessibilityRole="alert" className="rounded-xl bg-red-50 p-4 text-red-700">
            {error}
          </Text>
        ) : null}

        {!result ? (
          <View className="gap-4 rounded-2xl border border-slate-200 bg-white p-5">
            <Text className="text-base leading-6 text-slate-600">
              PDF, DOCX, PNG, or JPG · Max 5 MB
            </Text>
            <ActionButton secondary onPress={chooseFile}>Choose resume</ActionButton>
            {file ? (
              <Text className="text-sm leading-5 text-slate-600">{file.name}</Text>
            ) : null}
            <ActionButton onPress={checkResume} disabled={!file || busy}>
              {busy ? 'Checking resume…' : 'Check my resume'}
            </ActionButton>
            {busy ? <ActivityIndicator color="#2563eb" /> : null}
          </View>
        ) : (
          <>
            <View className="rounded-2xl border border-slate-200 bg-white p-5">
              <Text className="text-sm font-medium text-slate-500">Overall score</Text>
              <Text className="mt-1 text-4xl font-bold text-blue-700">
                {result.overallScore ?? 0}
                <Text className="text-xl text-slate-500">/100</Text>
              </Text>
            </View>

            <View className="rounded-2xl border border-slate-200 bg-white p-5">
              <Text className="text-lg font-semibold text-slate-900">Category scores</Text>
              {scoreLabels.map(([label, key]) => (
                <View key={key} className="mt-3 flex-row justify-between">
                  <Text className="text-base text-slate-600">{label}</Text>
                  <Text className="font-semibold text-slate-900">{result[key] ?? 0}/100</Text>
                </View>
              ))}
            </View>

            <Feedback title="Strengths" items={result.strengths} />
            <Feedback title="Areas to improve" items={result.weaknesses} />
            <Feedback title="Suggestions" items={result.suggestions} />
            <Feedback title="Recommended edits" items={result.recommendedChanges} />
            <ActionButton secondary onPress={startOver}>Check another resume</ActionButton>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
