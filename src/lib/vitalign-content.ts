export type Lang = "en" | "hi";

export type Status = "verified" | "recalled";
export type Risk = "high" | "moderate" | "normal";

export type Medicine = {
  id: string;
  name: string;
  purpose: string;
  status: Status;
  note: string;
};

type Pack = {
  dir: string;
  brand: string;
  tagline: string;
  loadSample: string;
  largerText: string;
  normalText: string;
  langLabel: string;
  footer: string;
  tabs: { medicines: string; symptoms: string; schedule: string; notices: string };
  medicines: Medicine[];
  addTitle: string;
  addHelp: string;
  add: string;
  added: string;
  listTitle: string;
  listEmpty: string;
  remove: string;
  verifiedBanner: string;
  recalledBanner: string;
  symptomsTitle: string;
  symptomsHelp: string;
  symptoms: { id: string; label: string }[];
  checkCauses: string;
  conflictTitle: string;
  conflictHelp: string;
  conflictPrefix: string;
  whatCauses: string;
  adviceLabel: string;
  cautionNote: string;
  conflicts: { id: string; pair: string; effect: string; advice: string; level: Risk }[];
  findingsTitle: string;
  breakdownTitle: string;
  causes: { id: string; label: string; percent: number; tone: "primary" | "danger" | "warn" }[];
  actionTitle: string;
  actionText: string;
  scheduleTitle: string;
  schedule: { id: string; time: string; clock: string; text: string }[];
  dietNotice: string;
  metrics: { id: string; label: string; value: string }[];
  personalRecord: (v: number, t: number) => string;
  mapTitle: string;
  mapHelp: string;
  noticesCountLabel: string;
  riskLabels: Record<Risk, string>;
  regions: { id: string; state: string; risk: Risk; alerts: number }[];
  feedTitle: string;
  feedAll: string;
  feedFiltered: (state: string) => string;
  feedEmpty: string;
  columns: {
    state: string;
    brand: string;
    medicine: string;
    batch: string;
    mfg: string;
    issue: string;
    date: string;
  };
  notices: {
    id: string;
    state: string;
    brand: string;
    medicine: string;
    batch: string;
    mfg: string;
    issue: string;
    date: string;
  }[];
};

export const content: Record<Lang, Pack> = {
  en: {
    dir: "ltr",
    brand: "VitAlign",
    tagline: "Medicine Safety and Daily Schedule Assistant",
    loadSample: "Load Sample Patient Case",
    largerText: "Larger Text Size",
    normalText: "Normal Text Size",
    langLabel: "Language",
    footer:
      "VitAlign provides general information only. Always follow the advice of your doctor or pharmacist.",
    tabs: {
      medicines: "Check Medicines",
      symptoms: "Symptom Safety Check",
      schedule: "Daily Medicine Schedule",
      notices: "Government Safety Notices",
    },
    medicines: [
      {
        id: "telmisartan",
        name: "Telmisartan 40mg",
        purpose: "For Blood Pressure",
        status: "verified",
        note: "Batch TL-4471 checked against the national medicine register.",
      },
      {
        id: "pantoprazole",
        name: "Pantoprazole 40mg",
        purpose: "For Acidity / Stomach",
        status: "verified",
        note: "Batch PN-1180 checked against the national medicine register.",
      },
      {
        id: "atorvastatin",
        name: "Atorvastatin 20mg",
        purpose: "For Cholesterol",
        status: "recalled",
        note: "Batch AT-9032 failed a quality test in a government laboratory.",
      },
      {
        id: "ciprofloxacin",
        name: "Ciprofloxacin 500mg",
        purpose: "Antibiotic",
        status: "verified",
        note: "Genuine batch. Food timing care needed — see Daily Medicine Schedule.",
      },
    ],
    addTitle: "Add or Verify Medicine",
    addHelp: "Select a medicine below to add it to your list and check whether it is genuine.",
    add: "Add",
    added: "Added",
    listTitle: "Your Medicine List",
    listEmpty:
      'No medicines added yet. Use the buttons above, or select "Load Sample Patient Case".',
    remove: "Remove",
    verifiedBanner: "Verified Genuine — Passed Government Schedule H2 verification",
    recalledBanner:
      "DO NOT CONSUME — This batch was recalled by national drug safety authorities due to quality failure",
    symptomsTitle: "Symptom Safety Check",
    symptomsHelp: "Select any symptom you are currently experiencing:",
    symptoms: [
      { id: "dizzy", label: "Dizziness or lightheadedness" },
      { id: "muscle", label: "Muscle pain or weakness" },
      { id: "stomach", label: "Stomach discomfort or nausea" },
      { id: "rash", label: "Skin rash or itching" },
    ],
    checkCauses: "Check Possible Causes",
    conflictTitle: "Active Medicine Conflict and Action Report",
    conflictHelp:
      "Based on the symptoms you selected, the following medicines in your list appear to be working against each other.",
    conflictPrefix: "Conflict Detected:",
    whatCauses: "What this can cause:",
    adviceLabel: "Advice:",
    cautionNote:
      "Caution: Stop taking the flagged, poor-quality batch immediately. Do not stop your other medicines without your doctor's advice.",
    conflicts: [
      {
        id: "tel-pan",
        pair: "Telmisartan 40mg + Pantoprazole 40mg",
        effect:
          "Taken together, this pair can lower your blood pressure more sharply than expected. This may cause the dizziness and lightheadedness you reported, especially when standing up.",
        advice:
          "Do not change either dose on your own. Ask your doctor whether the two medicines should be taken several hours apart.",
        level: "moderate",
      },
      {
        id: "ator-batch",
        pair: "Atorvastatin 20mg — Recalled Batch AT-9032",
        effect:
          "This strip comes from a batch that failed a government quality test. A faulty cholesterol medicine can cause the muscle pain and weakness you reported.",
        advice:
          "Stop using this strip. Contact your clinic or pharmacy immediately to have it replaced with a genuine batch.",
        level: "high",
      },
      {
        id: "cipro-food",
        pair: "Ciprofloxacin 500mg + Milk or Dairy Foods",
        effect:
          "Calcium in milk, yogurt or cheese blocks the medicine from being absorbed properly, which can cause stomach discomfort and reduce the benefit of the treatment.",
        advice:
          "Keep a gap of at least 2 hours between this medicine and any dairy food. No dose change is needed.",
        level: "low" as unknown as Risk,
      },
    ],
    findingsTitle: "Findings Summary",
    breakdownTitle: "Probable Cause Breakdown",
    causes: [
      {
        id: "interaction",
        percent: 55,
        label: "Interaction between two of your prescribed medicines",
        tone: "primary",
      },
      {
        id: "quality",
        percent: 35,
        label: "Quality defect detected in recalled medicine batch",
        tone: "danger",
      },
      {
        id: "timing",
        percent: 10,
        label: "Medicine taken at an improper time relative to meals",
        tone: "warn",
      },
    ],
    actionTitle: "Action Recommended",
    actionText:
      "Please share this summary with your treating physician or pharmacist. Do not alter or stop prescribed medicines without medical supervision.",
    scheduleTitle: "Daily Medicine Schedule",
    schedule: [
      {
        id: "morning",
        time: "Morning (Before Breakfast)",
        clock: "7:30 AM",
        text: "Take Pantoprazole with water 30 minutes before food.",
      },
      {
        id: "afternoon",
        time: "Afternoon (After Lunch)",
        clock: "1:30 PM",
        text: "Take your Blood Pressure medicine with or immediately after food.",
      },
      {
        id: "night",
        time: "Night (Before Sleep)",
        clock: "9:30 PM",
        text: "Take your Cholesterol medicine before bedtime.",
      },
    ],
    dietNotice:
      "Dietary Notice: Do not consume milk, yogurt, or calcium-rich dairy within 2 hours of taking Ciprofloxacin to ensure proper medicine absorption.",
    metrics: [
      { id: "total", label: "Total Medicines Verified", value: "1,248" },
      { id: "rate", label: "Flagged Substandard Rate", value: "10.5%" },
      { id: "hotspots", label: "High-Risk Regional Hotspots", value: "3 Active Zones" },
      { id: "recalled", label: "Recalled Batches Cataloged", value: "42" },
    ],
    personalRecord: (v, t) =>
      `Your personal record: ${v} of ${t} medicines in your list are confirmed genuine.`,
    mapTitle: "Regional Safety Map",
    mapHelp:
      "Select a state to see only the safety notices reported there. Select it again to see all notices.",
    noticesCountLabel: "notices",
    riskLabels: { high: "High Alert", moderate: "Moderate Alert", normal: "Normal" },
    regions: [
      { id: "MH", state: "Maharashtra", risk: "high", alerts: 2 },
      { id: "DL", state: "Delhi", risk: "high", alerts: 2 },
      { id: "GJ", state: "Gujarat", risk: "moderate", alerts: 1 },
      { id: "UP", state: "Uttar Pradesh", risk: "high", alerts: 1 },
      { id: "KA", state: "Karnataka", risk: "moderate", alerts: 1 },
      { id: "TN", state: "Tamil Nadu", risk: "normal", alerts: 1 },
      { id: "WB", state: "West Bengal", risk: "normal", alerts: 1 },
      { id: "RJ", state: "Rajasthan", risk: "normal", alerts: 0 },
      { id: "KL", state: "Kerala", risk: "normal", alerts: 0 },
    ],
    feedTitle: "Recent National Safety Notices",
    feedAll: "Showing notices from all states.",
    feedFiltered: (state) => `Showing notices reported in ${state}.`,
    feedEmpty: "No notices recorded for this state.",
    columns: {
      state: "State",
      brand: "Brand Name",
      medicine: "Medicine",
      batch: "Batch Number",
      mfg: "Made In",
      issue: "Reported Problem",
      date: "Date",
    },
    notices: [
      { id: "AT-9032", state: "Maharashtra", brand: "Atorva-Guard 20", medicine: "Atorvastatin 20mg", batch: "AT-9032", mfg: "Mar 2026", issue: "Failed dissolution test", date: "12 Aug 2026" },
      { id: "PN-8814", state: "Maharashtra", brand: "Panto-Relief 40", medicine: "Pantoprazole 40mg", batch: "PN-8814", mfg: "Feb 2026", issue: "Discolouration of tablets", date: "07 Aug 2026" },
      { id: "MT-2210", state: "Delhi", brand: "Glucomet 500", medicine: "Metformin 500mg", batch: "MT-2210", mfg: "Jan 2026", issue: "Incorrect medicine strength", date: "09 Aug 2026" },
      { id: "CP-6621", state: "Delhi", brand: "Cipro-Safe 500", medicine: "Ciprofloxacin 500mg", batch: "CP-6621", mfg: "Apr 2026", issue: "Impurity found in sample", date: "02 Aug 2026" },
      { id: "AM-7745", state: "Gujarat", brand: "Amoxil-G 500", medicine: "Amoxicillin 500mg", batch: "AM-7745", mfg: "Feb 2026", issue: "Packaging and labelling fault", date: "04 Aug 2026" },
      { id: "PC-3391", state: "Uttar Pradesh", brand: "Parafast 650", medicine: "Paracetamol 650mg", batch: "PC-3391", mfg: "Dec 2025", issue: "Failed dissolution test", date: "28 Jul 2026" },
      { id: "RN-5502", state: "Karnataka", brand: "Ranitab 150", medicine: "Ranitidine 150mg", batch: "RN-5502", mfg: "Nov 2025", issue: "Impurity found in sample", date: "21 Jul 2026" },
      { id: "TL-4471", state: "Tamil Nadu", brand: "Telmi-Care 40", medicine: "Telmisartan 40mg", batch: "TL-4471", mfg: "Mar 2026", issue: "Moisture damage in packing", date: "18 Jul 2026" },
      { id: "AZ-1207", state: "West Bengal", brand: "Azi-Cure 500", medicine: "Azithromycin 500mg", batch: "AZ-1207", mfg: "Jan 2026", issue: "Discolouration of tablets", date: "10 Jul 2026" },
    ],
  },

  hi: {
    dir: "ltr",
    brand: "VitAlign",
    tagline: "दवाई सुरक्षा और दैनिक समय सारिणी सहायक",
    loadSample: "नमूना मरीज़ का केस लोड करें",
    largerText: "बड़े अक्षर",
    normalText: "सामान्य अक्षर",
    langLabel: "भाषा",
    footer:
      "VitAlign केवल सामान्य जानकारी देता है। हमेशा अपने डॉक्टर या दवा विक्रेता की सलाह मानें।",
    tabs: {
      medicines: "दवाइयों की जाँच",
      symptoms: "लक्षण एवं सुरक्षा जाँच",
      schedule: "दवाइयों का सही समय",
      notices: "सरकारी सुरक्षा सूचनाएँ",
    },
    medicines: [
      {
        id: "telmisartan",
        name: "टेल्मिसार्टन 40mg",
        purpose: "ब्लड प्रेशर के लिए",
        status: "verified",
        note: "बैच TL-4471 की जाँच सरकारी दवा रजिस्टर से की गई है।",
      },
      {
        id: "pantoprazole",
        name: "पैंटोप्राज़ोल 40mg",
        purpose: "गैस और पेट की समस्या के लिए",
        status: "verified",
        note: "बैच PN-1180 की जाँच सरकारी दवा रजिस्टर से की गई है।",
      },
      {
        id: "atorvastatin",
        name: "एटोरवास्टेटिन 20mg",
        purpose: "कोलेस्ट्रॉल के लिए",
        status: "recalled",
        note: "बैच AT-9032 सरकारी प्रयोगशाला की गुणवत्ता जाँच में फेल हुआ है।",
      },
      {
        id: "ciprofloxacin",
        name: "सिप्रोफ्लॉक्सासिन 500mg",
        purpose: "संक्रमण की दवाई",
        status: "verified",
        note: "बैच असली है। खाने के समय का ध्यान रखें — 'दवाइयों का सही समय' देखें।",
      },
    ],
    addTitle: "दवाई जोड़ें या जाँचें",
    addHelp: "नीचे से दवाई चुनें, वह आपकी सूची में जुड़ जाएगी और असली है या नहीं यह जाँचा जाएगा।",
    add: "जोड़ें",
    added: "जोड़ी गई",
    listTitle: "आपकी दवाइयों की सूची",
    listEmpty:
      "अभी तक कोई दवाई नहीं जोड़ी गई है। ऊपर दिए बटन चुनें, या 'नमूना मरीज़ का केस लोड करें' दबाएँ।",
    remove: "हटाएँ",
    verifiedBanner: "सुरक्षित और असली — सरकारी Schedule H2 जाँच में सही पाई गई",
    recalledBanner:
      "कृपया यह दवाई न लें — गुणवत्ता में कमी के कारण सरकार द्वारा इस बैच को वापस मंगाया गया है",
    symptomsTitle: "लक्षण एवं सुरक्षा जाँच",
    symptomsHelp: "आपको अभी कौन सी तकलीफ़ महसूस हो रही है, चुनें:",
    symptoms: [
      { id: "dizzy", label: "चक्कर आना या सिर घूमना" },
      { id: "muscle", label: "मांसपेशियों में दर्द या कमज़ोरी" },
      { id: "stomach", label: "पेट में दर्द या जी मिचलाना" },
      { id: "rash", label: "त्वचा पर लाल चकत्ते या खुजली" },
    ],
    checkCauses: "कारणों की जाँच करें",
    conflictTitle: "दवाइयों के टकराव और सुझाव की रिपोर्ट",
    conflictHelp:
      "आपने जो तकलीफ़ें चुनी हैं, उनके आधार पर आपकी सूची की ये दवाइयाँ आपस में टकराव कर रही हैं।",
    conflictPrefix: "दवाइयों का टकराव:",
    whatCauses: "इससे क्या हो सकता है:",
    adviceLabel: "सलाह:",
    cautionNote:
      "सावधानी: ख़राब गुणवत्ता वाली दवाई का सेवन तुरंत रोकें। बिना डॉक्टर की सलाह के बाकी दवाइयाँ बंद न करें।",
    conflicts: [
      {
        id: "tel-pan",
        pair: "टेल्मिसार्टन 40mg + पैंटोप्राज़ोल 40mg",
        effect:
          "ये दोनों दवाइयाँ साथ लेने पर ब्लड प्रेशर उम्मीद से ज़्यादा गिर सकता है। इसी वजह से आपको चक्कर आना या सिर घूमना महसूस हो सकता है, खासकर खड़े होते समय।",
        advice:
          "अपने आप कोई भी खुराक न बदलें। डॉक्टर से पूछें कि क्या इन दोनों दवाइयों के बीच कुछ घंटों का अंतर रखना चाहिए।",
        level: "moderate",
      },
      {
        id: "ator-batch",
        pair: "एटोरवास्टेटिन 20mg — वापस मंगाया गया बैच AT-9032",
        effect:
          "यह पत्ता उस बैच का है जो सरकारी गुणवत्ता जाँच में फेल हुआ है। ख़राब कोलेस्ट्रॉल दवाई से मांसपेशियों में दर्द और कमज़ोरी हो सकती है।",
        advice:
          "इस पत्ते का उपयोग तुरंत बंद करें। इसे असली बैच से बदलवाने के लिए अपने क्लीनिक या मेडिकल स्टोर से तुरंत संपर्क करें।",
        level: "high",
      },
      {
        id: "cipro-food",
        pair: "सिप्रोफ्लॉक्सासिन 500mg + दूध या डेयरी उत्पाद",
        effect:
          "दूध, दही या पनीर में मौजूद कैल्शियम दवाई को शरीर में ठीक से घुलने नहीं देता, जिससे पेट में तकलीफ़ हो सकती है और दवाई का असर कम हो जाता है।",
        advice:
          "इस दवाई और किसी भी डेयरी उत्पाद के बीच कम से कम 2 घंटे का अंतर रखें। खुराक बदलने की ज़रूरत नहीं है।",
        level: "low" as unknown as Risk,
      },
    ],
    findingsTitle: "जाँच का सारांश",
    breakdownTitle: "संभावित कारणों का विवरण",
    causes: [
      { id: "interaction", percent: 55, label: "आपकी दो दवाइयों का आपस में रिएक्शन", tone: "primary" },
      { id: "quality", percent: 35, label: "वापस मंगाए गए बैच की ख़राब गुणवत्ता", tone: "danger" },
      { id: "timing", percent: 10, label: "खाने के हिसाब से दवाई गलत समय पर लेना", tone: "warn" },
    ],
    actionTitle: "क्या करना चाहिए",
    actionText:
      "कृपया यह सारांश अपने डॉक्टर या दवा विक्रेता को दिखाएँ। डॉक्टर की सलाह के बिना कोई दवाई बदलें या बंद न करें।",
    scheduleTitle: "दवाइयों का सही समय",
    schedule: [
      {
        id: "morning",
        time: "सुबह (नाश्ते से पहले)",
        clock: "सुबह 7:30",
        text: "पैंटोप्राज़ोल को खाने से 30 मिनट पहले पानी के साथ लें।",
      },
      {
        id: "afternoon",
        time: "दोपहर (खाने के बाद)",
        clock: "दोपहर 1:30",
        text: "ब्लड प्रेशर की दवाई खाने के साथ या तुरंत बाद लें।",
      },
      {
        id: "night",
        time: "रात (सोने से पहले)",
        clock: "रात 9:30",
        text: "कोलेस्ट्रॉल की दवाई सोने से पहले लें।",
      },
    ],
    dietNotice:
      "आहार संबंधी सूचना: इस दवाई के साथ या 2 घंटे के भीतर दूध, दही या डेयरी उत्पादों का सेवन न करें।",
    metrics: [
      { id: "total", label: "कुल जाँची गई दवाइयाँ", value: "1,248" },
      { id: "rate", label: "असुरक्षित दवाइयों की दर", value: "10.5%" },
      { id: "hotspots", label: "उच्च जोखिम वाले क्षेत्र", value: "3 सक्रिय क्षेत्र" },
      { id: "recalled", label: "वापस मंगाए गए बैच", value: "42" },
    ],
    personalRecord: (v, t) =>
      `आपका रिकॉर्ड: आपकी सूची की ${t} में से ${v} दवाइयाँ असली पाई गई हैं।`,
    mapTitle: "क्षेत्रवार सुरक्षा नक्शा",
    mapHelp:
      "किसी राज्य को चुनें ताकि वहीं की सूचनाएँ दिखें। दोबारा चुनने पर सभी सूचनाएँ दिखने लगेंगी।",
    noticesCountLabel: "सूचनाएँ",
    riskLabels: { high: "अधिक ख़तरा", moderate: "मध्यम ख़तरा", normal: "सामान्य" },
    regions: [
      { id: "MH", state: "महाराष्ट्र", risk: "high", alerts: 2 },
      { id: "DL", state: "दिल्ली", risk: "high", alerts: 2 },
      { id: "GJ", state: "गुजरात", risk: "moderate", alerts: 1 },
      { id: "UP", state: "उत्तर प्रदेश", risk: "high", alerts: 1 },
      { id: "KA", state: "कर्नाटक", risk: "moderate", alerts: 1 },
      { id: "TN", state: "तमिलनाडु", risk: "normal", alerts: 1 },
      { id: "WB", state: "पश्चिम बंगाल", risk: "normal", alerts: 1 },
      { id: "RJ", state: "राजस्थान", risk: "normal", alerts: 0 },
      { id: "KL", state: "केरल", risk: "normal", alerts: 0 },
    ],
    feedTitle: "हाल की राष्ट्रीय सुरक्षा सूचनाएँ",
    feedAll: "सभी राज्यों की सूचनाएँ दिखाई जा रही हैं।",
    feedFiltered: (state) => `${state} में दर्ज सूचनाएँ दिखाई जा रही हैं।`,
    feedEmpty: "इस राज्य के लिए कोई सूचना दर्ज नहीं है।",
    columns: {
      state: "राज्य",
      brand: "ब्रांड का नाम",
      medicine: "दवाई",
      batch: "बैच नंबर",
      mfg: "बनने की तारीख़",
      issue: "बताई गई समस्या",
      date: "तारीख़",
    },
    notices: [
      { id: "AT-9032", state: "महाराष्ट्र", brand: "Atorva-Guard 20", medicine: "एटोरवास्टेटिन 20mg", batch: "AT-9032", mfg: "मार्च 2026", issue: "घुलनशीलता जाँच में फेल", date: "12 अगस्त 2026" },
      { id: "PN-8814", state: "महाराष्ट्र", brand: "Panto-Relief 40", medicine: "पैंटोप्राज़ोल 40mg", batch: "PN-8814", mfg: "फ़रवरी 2026", issue: "गोलियों का रंग बदला हुआ", date: "07 अगस्त 2026" },
      { id: "MT-2210", state: "दिल्ली", brand: "Glucomet 500", medicine: "मेटफॉर्मिन 500mg", batch: "MT-2210", mfg: "जनवरी 2026", issue: "दवाई की मात्रा गलत", date: "09 अगस्त 2026" },
      { id: "CP-6621", state: "दिल्ली", brand: "Cipro-Safe 500", medicine: "सिप्रोफ्लॉक्सासिन 500mg", batch: "CP-6621", mfg: "अप्रैल 2026", issue: "नमूने में अशुद्धि मिली", date: "02 अगस्त 2026" },
      { id: "AM-7745", state: "गुजरात", brand: "Amoxil-G 500", medicine: "एमोक्सिसिलिन 500mg", batch: "AM-7745", mfg: "फ़रवरी 2026", issue: "पैकिंग और लेबल में गड़बड़ी", date: "04 अगस्त 2026" },
      { id: "PC-3391", state: "उत्तर प्रदेश", brand: "Parafast 650", medicine: "पैरासिटामोल 650mg", batch: "PC-3391", mfg: "दिसंबर 2025", issue: "घुलनशीलता जाँच में फेल", date: "28 जुलाई 2026" },
      { id: "RN-5502", state: "कर्नाटक", brand: "Ranitab 150", medicine: "रैनिटिडीन 150mg", batch: "RN-5502", mfg: "नवंबर 2025", issue: "नमूने में अशुद्धि मिली", date: "21 जुलाई 2026" },
      { id: "TL-4471", state: "तमिलनाडु", brand: "Telmi-Care 40", medicine: "टेल्मिसार्टन 40mg", batch: "TL-4471", mfg: "मार्च 2026", issue: "पैकिंग में नमी से नुकसान", date: "18 जुलाई 2026" },
      { id: "AZ-1207", state: "पश्चिम बंगाल", brand: "Azi-Cure 500", medicine: "एज़िथ्रोमाइसिन 500mg", batch: "AZ-1207", mfg: "जनवरी 2026", issue: "गोलियों का रंग बदला हुआ", date: "10 जुलाई 2026" },
    ],
  },
};

export const RISK_STYLE: Record<Risk, { bg: string; border: string; text: string }> = {
  high: { bg: "oklch(0.94 0.05 27)", border: "oklch(0.58 0.22 27)", text: "oklch(0.42 0.19 27)" },
  moderate: { bg: "oklch(0.96 0.05 80)", border: "oklch(0.68 0.15 70)", text: "oklch(0.42 0.11 62)" },
  normal: { bg: "oklch(0.96 0.04 150)", border: "oklch(0.55 0.13 150)", text: "oklch(0.36 0.11 150)" },
};

export const riskOf = (level: string): Risk =>
  level === "high" ? "high" : level === "moderate" ? "moderate" : "normal";
