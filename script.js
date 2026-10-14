const translations = {
  en: {
    skip: "Skip to main content", languageLabel: "Language", navLabel: "Main navigation",
    navHome: "Home", navAppointments: "Appointments", navMedicines: "Medicine reminders", navReports: "Reports", navAssistant: "Health assistant",
    welcomeEyebrow: "YOUR PERSONAL HEALTH COPILOT", welcomeTitle: "Your health, a little easier.",
    welcomeText: "Keep appointments, medicine reminders and health information together in one simple place.",
    privacyHome: "Your information stays on this device. Reports are not saved.",
    startHere: "START HERE", quickTitle: "What would you like to do?",
    addAppointmentAction: "Add an appointment", addMedicineAction: "Set a medicine reminder",
    reportAction: "Understand a report", askAction: "Ask a general health question",
    planAhead: "PLAN AHEAD", appointmentsTitle: "Appointments",
    appointmentsDescription: "Keep track of upcoming visits and check-ups.",
    appointmentFormTitle: "Add an appointment", appointmentName: "What is the visit for?",
    appointmentNamePlaceholder: "For example, check-up", providerName: "Doctor or clinic (optional)",
    providerPlaceholder: "Name", dateTime: "Date and time", saveAppointment: "Save appointment",
    upcomingAppointments: "Your appointments", noAppointments: "No appointments yet. Add one when you are ready.",
    dailyRoutine: "DAILY ROUTINE", medicinesTitle: "Medicine reminders",
    medicinesDescription: "Make a reminder for medicines already prescribed to you.",
    medicineFormTitle: "Add a reminder", medicineName: "Medicine name",
    medicinePlaceholder: "Name on your prescription", reminderDateTime: "Reminder date and time",
    medicineNotes: "Notes from your clinician (optional)", medicineNotesPlaceholder: "For example, follow the label",
    medicineSafety: "Enter timing and instructions only as given by your healthcare professional or medicine label. This app does not send notifications.",
    saveReminder: "Save reminder", yourReminders: "Your reminders", noReminders: "No reminders yet. Add one when you are ready.",
    plainLanguage: "IN PLAIN LANGUAGE", reportsTitle: "Medical reports",
    reportsDescription: "Get a short preview of readable text in a report. Your file is processed in memory and not saved.",
    chooseReport: "Choose a report file (.txt or .pdf)", reportLimits: "Maximum 5 MB; PDFs up to 20 pages. Scanned images may not contain readable text.",
    summarizeReport: "Summarize on this device", summaryTitle: "Report text preview",
    reportConsent: "I agree to send this report text to the configured AI service for an explanation.",
    explainReport: "Explain terms with AI", important: "Important:",
    reportDisclaimer: "A text preview cannot interpret results or replace advice from your healthcare professional. Discuss your report with them.",
    hereToHelp: "HERE TO HELP", assistantTitle: "General health assistant",
    assistantDescription: "Ask a general health question. This tool cannot diagnose or recommend treatment.",
    checkingAI: "Checking AI connection…", aiConnected: "AI is configured (consent required)",
    aiNotConnected: "AI is not connected", questionLabel: "What would you like to know?",
    questionPlaceholder: "Ask a general question (do not include personal details)",
    assistantConsent: "If AI is configured, I agree to send this question to that AI service. Do not include names or other personal details.",
    sendQuestion: "Get a safe response", responseTitle: "Response",
    assistantDisclaimer: "This is general information, not medical advice. For symptoms or treatment, speak to a qualified healthcare professional. In an emergency, contact local emergency services.",
    footerPrivacy: "HealthMate AI keeps records in a local SQLite database. This beginner project is designed for use on your own computer only.",
    footerSample: "No sample patient records are created.", delete: "Delete", loading: "Loading…",
    savedAppointment: "Appointment saved.", savedReminder: "Reminder saved.", deleted: "Deleted.",
    networkError: "Could not reach the app. Check that Flask is running and try again.",
    requestError: "Something went wrong. Please check your details and try again.",
    uploading: "Reading your report…", asking: "Preparing a safe response…",
    aiUnavailable: "AI is not configured. No data was sent to an AI service.",
    reportFailed: "Could not read this report.", aiFailed: "Could not get an AI explanation.",
    assistantFailed: "Could not get a response.", confirmDelete: "Delete this item?",
    checkFile: "Choose a .txt or .pdf report file.", noRecords: "No records"
  },
  te: {
    skip: "ప్రధాన విషయానికి వెళ్లండి", languageLabel: "భాష", navLabel: "ప్రధాన నావిగేషన్",
    navHome: "హోమ్", navAppointments: "అపాయింట్‌మెంట్‌లు", navMedicines: "మందుల రిమైండర్‌లు", navReports: "రిపోర్టులు", navAssistant: "ఆరోగ్య సహాయకుడు",
    welcomeEyebrow: "మీ వ్యక్తిగత ఆరోగ్య సహాయకుడు", welcomeTitle: "మీ ఆరోగ్య సంరక్షణ ఇప్పుడు మరింత సులభం.",
    welcomeText: "అపాయింట్‌మెంట్‌లు, మందుల రిమైండర్‌లు, ఆరోగ్య సమాచారాన్ని ఒకే చోట ఉంచండి.",
    privacyHome: "మీ సమాచారం ఈ పరికరంలోనే ఉంటుంది. రిపోర్టులు భద్రపరచబడవు.",
    startHere: "ఇక్కడ ప్రారంభించండి", quickTitle: "మీరు ఏమి చేయాలనుకుంటున్నారు?",
    addAppointmentAction: "అపాయింట్‌మెంట్ జోడించండి", addMedicineAction: "మందుల రిమైండర్ పెట్టండి",
    reportAction: "రిపోర్టును అర్థం చేసుకోండి", askAction: "సాధారణ ఆరోగ్య ప్రశ్న అడగండి",
    planAhead: "ముందుగా ప్రణాళిక చేసుకోండి", appointmentsTitle: "అపాయింట్‌మెంట్‌లు",
    appointmentsDescription: "రాబోయే వైద్య సందర్శనలు, పరీక్షలను గుర్తుంచుకోండి.",
    appointmentFormTitle: "అపాయింట్‌మెంట్ జోడించండి", appointmentName: "సందర్శన కారణం ఏమిటి?",
    appointmentNamePlaceholder: "ఉదాహరణకు, సాధారణ పరీక్ష", providerName: "వైద్యుడు లేదా క్లినిక్ (ఐచ్ఛికం)",
    providerPlaceholder: "పేరు", dateTime: "తేదీ, సమయం", saveAppointment: "అపాయింట్‌మెంట్ భద్రపరచండి",
    upcomingAppointments: "మీ అపాయింట్‌మెంట్‌లు", noAppointments: "ఇంకా అపాయింట్‌మెంట్‌లు లేవు. సిద్ధమైనప్పుడు జోడించండి.",
    dailyRoutine: "రోజువారీ అలవాటు", medicinesTitle: "మందుల రిమైండర్‌లు",
    medicinesDescription: "మీకు ఇప్పటికే సూచించిన మందుల కోసం రిమైండర్ పెట్టండి.",
    medicineFormTitle: "రిమైండర్ జోడించండి", medicineName: "మందు పేరు",
    medicinePlaceholder: "మీ ప్రిస్క్రిప్షన్‌లోని పేరు", reminderDateTime: "రిమైండర్ తేదీ, సమయం",
    medicineNotes: "వైద్యుడు ఇచ్చిన సూచనలు (ఐచ్ఛికం)", medicineNotesPlaceholder: "ఉదాహరణకు, లేబుల్‌ను అనుసరించండి",
    medicineSafety: "మీ వైద్యుడు లేదా మందుల లేబుల్ ఇచ్చిన సమయం, సూచనలను మాత్రమే నమోదు చేయండి. ఈ యాప్ నోటిఫికేషన్‌లు పంపదు.",
    saveReminder: "రిమైండర్ భద్రపరచండి", yourReminders: "మీ రిమైండర్‌లు", noReminders: "ఇంకా రిమైండర్‌లు లేవు. సిద్ధమైనప్పుడు జోడించండి.",
    plainLanguage: "సులభమైన భాషలో", reportsTitle: "వైద్య రిపోర్టులు",
    reportsDescription: "రిపోర్టులో చదవగలిగే పాఠ్యానికి సంక్షిప్త సారాంశం పొందండి. ఫైల్ తాత్కాలికంగా మాత్రమే చదవబడుతుంది; భద్రపరచబడదు.",
    chooseReport: "రిపోర్ట్ ఫైల్ ఎంచుకోండి (.txt లేదా .pdf)", reportLimits: "గరిష్ఠంగా 5 MB; PDF గరిష్ఠంగా 20 పేజీలు. స్కాన్ చేసిన చిత్రాల్లో చదవగలిగే పాఠ్యం ఉండకపోవచ్చు.",
    summarizeReport: "ఈ పరికరంలో సారాంశం చేయండి", summaryTitle: "రిపోర్ట్ పాఠ్య సారాంశం",
    reportConsent: "వివరణ కోసం ఈ రిపోర్ట్ పాఠ్యాన్ని కాన్ఫిగర్ చేసిన AI సేవకు పంపడానికి నేను అంగీకరిస్తున్నాను.",
    explainReport: "AIతో పదాలను వివరించండి", important: "ముఖ్యం:",
    reportDisclaimer: "పాఠ్య సారాంశం ఫలితాలను అర్థం చేసుకోదు లేదా వైద్యుని సలహాకు ప్రత్యామ్నాయం కాదు. మీ రిపోర్ట్ గురించి వారితో మాట్లాడండి.",
    hereToHelp: "మీకు సహాయం చేయడానికి", assistantTitle: "సాధారణ ఆరోగ్య సహాయకుడు",
    assistantDescription: "సాధారణ ఆరోగ్య ప్రశ్న అడగండి. ఇది వ్యాధి నిర్ధారణ చేయదు లేదా చికిత్సను సూచించదు.",
    checkingAI: "AI అనుసంధానాన్ని తనిఖీ చేస్తోంది…", aiConnected: "AI కాన్ఫిగర్ చేయబడింది (మీ అంగీకారం అవసరం)",
    aiNotConnected: "AI అనుసంధానం కాలేదు", questionLabel: "మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    questionPlaceholder: "సాధారణ ప్రశ్న అడగండి (వ్యక్తిగత వివరాలు ఇవ్వవద్దు)",
    assistantConsent: "AI కాన్ఫిగర్ అయితే, ఈ ప్రశ్నను ఆ AI సేవకు పంపడానికి నేను అంగీకరిస్తున్నాను. పేర్లు లేదా వ్యక్తిగత వివరాలు ఇవ్వవద్దు.",
    sendQuestion: "సురక్షితమైన సమాధానం పొందండి", responseTitle: "సమాధానం",
    assistantDisclaimer: "ఇది సాధారణ సమాచారం మాత్రమే, వైద్య సలహా కాదు. లక్షణాలు లేదా చికిత్స గురించి అర్హత కలిగిన వైద్య నిపుణుడిని సంప్రదించండి. అత్యవసర పరిస్థితిలో స్థానిక అత్యవసర సేవలను సంప్రదించండి.",
    footerPrivacy: "HealthMate AI వివరాలను స్థానిక SQLite డేటాబేస్‌లో ఉంచుతుంది. ఈ ప్రారంభ ప్రాజెక్ట్ మీ స్వంత కంప్యూటర్‌లో ఉపయోగించడానికి రూపొందించబడింది.",
    footerSample: "నమూనా రోగి వివరాలు సృష్టించబడవు.", delete: "తొలగించండి", loading: "లోడ్ అవుతోంది…",
    savedAppointment: "అపాయింట్‌మెంట్ భద్రపరచబడింది.", savedReminder: "రిమైండర్ భద్రపరచబడింది.", deleted: "తొలగించబడింది.",
    networkError: "యాప్‌ను చేరుకోలేకపోయాం. Flask నడుస్తోందో చూసి మళ్లీ ప్రయత్నించండి.",
    requestError: "ఏదో సమస్య వచ్చింది. వివరాలు తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
    uploading: "రిపోర్ట్ చదువుతోంది…", asking: "సురక్షిత సమాధానం సిద్ధం చేస్తోంది…",
    aiUnavailable: "AI కాన్ఫిగర్ చేయబడలేదు. AI సేవకు సమాచారం పంపబడలేదు.",
    reportFailed: "ఈ రిపోర్ట్ చదవలేకపోయాం.", aiFailed: "AI వివరణ పొందలేకపోయాం.",
    assistantFailed: "సమాధానం పొందలేకపోయాం.", confirmDelete: "ఈ అంశాన్ని తొలగించాలా?",
    checkFile: ".txt లేదా .pdf రిపోర్ట్ ఫైల్‌ను ఎంచుకోండి.", noRecords: "రికార్డులు లేవు"
  }
};

let language = localStorage.getItem("healthmate-language") || "en";
let latestReportText = "";
let toastTimer;

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language === "te" ? "te" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.getElementById("language-select").value = language;
  updateAIStatus(window.aiConfigured);
  refreshLists();
}

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4500);
}

function errorMessage(message, fallbackKey = "requestError") {
  const codes = {
    "AI is not configured on this server. Your question was not sent.": "aiUnavailable",
    "AI is not configured on this server. No report text was sent.": "aiUnavailable"
  };
  return codes[message] ? t(codes[message]) : message || t(fallbackKey);
}

async function requestJSON(url, options = {}) {
  let response;
  try {
    response = await fetch(url, options);
  } catch (_error) {
    throw new Error(t("networkError"));
  }
  let data;
  try {
    data = await response.json();
  } catch (_error) {
    throw new Error(t("requestError"));
  }
  if (!response.ok) throw new Error(errorMessage(data.error));
  return data;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(language === "te" ? "te-IN" : "en", {
    dateStyle: "medium", timeStyle: "short"
  }).format(date);
}

function makeRecord(record, type) {
  const item = document.createElement("li");
  item.className = "record-item";
  const content = document.createElement("div");
  const name = document.createElement("p");
  name.className = "record-name";
  name.textContent = type === "appointment" ? record.title : record.name;
  const meta = document.createElement("p");
  meta.className = "record-meta";
  const details = [formatDate(record.scheduled_at)];
  if (type === "appointment" && record.provider) details.push(record.provider);
  if (type === "medicine" && record.instructions) details.push(record.instructions);
  meta.textContent = details.join(" · ");
  content.append(name, meta);
  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.type = "button";
  remove.textContent = t("delete");
  remove.setAttribute("aria-label", `${t("delete")}: ${name.textContent}`);
  remove.addEventListener("click", async () => {
    if (!window.confirm(t("confirmDelete"))) return;
    try {
      await requestJSON(`/api/${type === "appointment" ? "appointments" : "medicines"}/${record.id}`, { method: "DELETE" });
      showToast(t("deleted"));
      await refreshLists();
    } catch (error) {
      showToast(error.message, true);
    }
  });
  item.append(content, remove);
  return item;
}

async function populateList(path, elementId, emptyId, type) {
  const list = document.getElementById(elementId);
  const empty = document.getElementById(emptyId);
  try {
    const records = await requestJSON(path);
    list.replaceChildren(...records.map((record) => makeRecord(record, type)));
    empty.hidden = records.length > 0;
  } catch (error) {
    list.replaceChildren();
    empty.hidden = false;
    empty.textContent = error.message;
  }
}

async function refreshLists() {
  await Promise.all([
    populateList("/api/appointments", "appointment-list", "appointment-empty", "appointment"),
    populateList("/api/medicines", "medicine-list", "medicine-empty", "medicine")
  ]);
}

function updateAIStatus(configured) {
  const status = document.getElementById("ai-status");
  status.textContent = configured === undefined ? t("checkingAI") : configured ? t("aiConnected") : t("aiNotConnected");
  status.classList.toggle("connected", configured === true);
  status.classList.toggle("not-connected", configured === false);
  document.getElementById("report-explain-area").hidden = configured !== true || !latestReportText;
}

async function loadStatus() {
  try {
    const status = await requestJSON("/api/status");
    window.aiConfigured = status.ai_configured;
  } catch (_error) {
    window.aiConfigured = false;
  }
  updateAIStatus(window.aiConfigured);
}

function getFormValue(form, name) {
  return new FormData(form).get(name).toString().trim();
}

document.getElementById("language-select").addEventListener("change", (event) => {
  language = event.target.value === "te" ? "te" : "en";
  localStorage.setItem("healthmate-language", language);
  applyLanguage();
});

document.getElementById("appointment-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  try {
    await requestJSON("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: getFormValue(form, "title"),
        provider: getFormValue(form, "provider"),
        scheduled_at: getFormValue(form, "scheduled_at")
      })
    });
    form.reset();
    showToast(t("savedAppointment"));
    await refreshLists();
  } catch (error) {
    showToast(error.message, true);
  } finally {
    button.disabled = false;
  }
});

document.getElementById("medicine-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  try {
    await requestJSON("/api/medicines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: getFormValue(form, "name"),
        scheduled_at: getFormValue(form, "scheduled_at"),
        instructions: getFormValue(form, "instructions")
      })
    });
    form.reset();
    showToast(t("savedReminder"));
    await refreshLists();
  } catch (error) {
    showToast(error.message, true);
  } finally {
    button.disabled = false;
  }
});

document.getElementById("report-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const file = document.getElementById("report-file").files[0];
  if (!file || !/\.(txt|pdf)$/i.test(file.name)) {
    showToast(t("checkFile"), true);
    return;
  }
  const button = form.querySelector("button[type=submit]");
  const result = document.getElementById("report-result");
  latestReportText = "";
  document.getElementById("report-consent").checked = false;
  result.hidden = true;
  updateAIStatus(window.aiConfigured);
  button.disabled = true;
  button.textContent = t("uploading");
  try {
    const data = await requestJSON("/api/reports/summarize", {
      method: "POST",
      body: (() => { const body = new FormData(); body.append("report", file); return body; })()
    });
    latestReportText = data.report_text;
    document.getElementById("report-summary").textContent = data.summary;
    document.getElementById("report-explanation").hidden = true;
    result.hidden = false;
    updateAIStatus(window.aiConfigured);
  } catch (error) {
    showToast(error.message || t("reportFailed"), true);
  } finally {
    button.disabled = false;
    button.textContent = t("summarizeReport");
    document.getElementById("report-consent").checked = false;
  }
});

document.getElementById("explain-report-button").addEventListener("click", async (event) => {
  if (!document.getElementById("report-consent").checked) {
    showToast(t("reportConsent"), true);
    return;
  }
  const button = event.currentTarget;
  button.disabled = true;
  const result = document.getElementById("report-explanation");
  result.hidden = false;
  result.textContent = t("asking");
  try {
    const data = await requestJSON("/api/reports/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report_text: latestReportText, consent: true })
    });
    result.textContent = data.answer;
  } catch (error) {
    result.textContent = error.message || t("aiFailed");
  } finally {
    button.disabled = false;
    document.getElementById("report-consent").checked = false;
  }
});

document.getElementById("assistant-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const button = form.querySelector("button[type=submit]");
  const result = document.getElementById("assistant-result");
  const answer = document.getElementById("assistant-answer");
  button.disabled = true;
  result.hidden = false;
  answer.textContent = t("asking");
  try {
    const data = await requestJSON("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: document.getElementById("assistant-question").value.trim(),
        consent: document.getElementById("assistant-consent").checked
      })
    });
    answer.textContent = data.answer;
  } catch (error) {
    answer.textContent = error.message || t("assistantFailed");
  } finally {
    button.disabled = false;
    document.getElementById("assistant-consent").checked = false;
  }
});

applyLanguage();
loadStatus();
