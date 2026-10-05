import 'dotenv/config';
import mongoose from 'mongoose';
import Scheme from '../models/Scheme.js';

const schemes = [
  {
    name: "Student Scholarship Support Scheme",
    category: "Education",
    department: "Education Department",
    level: "State",
    state: "Tamil Nadu",
    benefit: "Financial assistance up to ₹50,000/year for eligible students",
    description: "Financial support for undergraduate and graduate students to cover tuition fees, study materials, and hostel expenses.",
    targetAudience: ["Students", "Undergraduate Students", "Graduate Students"],
    eligibility: {
      minAge: 17,
      maxAge: 30,
      education: ["Undergraduate", "Graduate"],
      maxIncome: 500000,
      locations: ["Tamil Nadu"]
    },
    documents: ["Identity Proof", "Income Certificate", "Mark Sheet", "Bank Account"],
    applicationSteps: ["Register on the education portal", "Upload marksheets and income proof", "Submit application for institute verification"],
    tags: ["education", "scholarship", "student"],
    demoMatch: 92,
    eligibilityPreview: ["Undergraduate profile aligned", "Income within threshold", "Tamil Nadu resident eligible"]
  },
  {
    name: "Youth Skill Development Grant",
    category: "Skill Development",
    department: "Skill Development & Entrepreneurship",
    level: "State",
    state: "Tamil Nadu",
    benefit: "100% sponsored vocational training with stipend of ₹3,000/month",
    description: "Industry-aligned technical training in AI, digital marketing, electronics, and precision manufacturing with placement support.",
    targetAudience: ["Students", "Job Seekers", "Youth"],
    eligibility: {
      minAge: 18,
      maxAge: 35,
      education: ["Undergraduate", "Graduate", "Diploma", "High School"],
      maxIncome: 600000,
      locations: ["Tamil Nadu"]
    },
    documents: ["Aadhaar Card", "Education Certificate", "Residence Proof"],
    applicationSteps: ["Select skill course", "Choose accredited training centre", "Complete enrollment verification"],
    tags: ["skill development", "training", "employment"],
    demoMatch: 88,
    eligibilityPreview: ["Age within 18-35 range", "Education level matched", "Open to skill training"]
  },
  {
    name: "Youth Employment & Apprenticeship Support",
    category: "Employment",
    department: "Labour & Employment Department",
    level: "Central",
    state: "All India",
    benefit: "Monthly stipend support of ₹4,500 during apprenticeship",
    description: "Connects job seekers with industrial apprenticeships and practical on-the-job training in recognized enterprises.",
    targetAudience: ["Job Seekers", "Youth", "Graduates"],
    eligibility: {
      minAge: 18,
      maxAge: 35,
      education: ["Undergraduate", "Graduate", "Diploma"],
      maxIncome: 700000,
      locations: []
    },
    documents: ["Identity Proof", "Degree / Diploma Certificate", "Bank Details"],
    applicationSteps: ["Create candidate profile", "Browse apprenticeship postings", "Apply directly to employers"],
    tags: ["employment", "job seeker", "apprenticeship"],
    demoMatch: 85,
    eligibilityPreview: ["Employment status eligible", "Central scheme applies across India", "Qualification matched"]
  },
  {
    name: "Micro Enterprise Starter Assistance",
    category: "Entrepreneurship",
    department: "MSME & Industries Department",
    level: "State",
    state: "Tamil Nadu",
    benefit: "Low-interest collateral-free loan up to ₹5,00,000 with 25% subsidy",
    description: "Seed funding and financial backing for first-time entrepreneurs establishing micro-enterprises or local business units.",
    targetAudience: ["Entrepreneurs", "Self-employed", "Youth"],
    eligibility: {
      minAge: 21,
      maxAge: 55,
      education: ["Undergraduate", "Graduate", "Diploma", "High School"],
      maxIncome: 800000,
      locations: ["Tamil Nadu"]
    },
    documents: ["Identity Proof", "Business Plan Proposal", "Bank Account", "Residence Proof"],
    applicationSteps: ["Prepare project report", "Apply online via MSME portal", "Present proposal to district screening committee"],
    tags: ["entrepreneurship", "business", "loan"],
    demoMatch: 79,
    eligibilityPreview: ["Self-employed intent matched", "Income threshold suitable", "Business proposal required"]
  },
  {
    name: "Family Housing Welfare Subsidy",
    category: "Housing",
    department: "Housing & Urban Development",
    level: "State",
    state: "Tamil Nadu",
    benefit: "Financial assistance up to ₹2,50,000 for home construction or upgrade",
    description: "Capital subsidy for low and middle-income families to construct Pucca houses or refurbish existing living units.",
    targetAudience: ["Families", "Low-income Households"],
    eligibility: {
      minAge: 21,
      maxAge: 70,
      education: [],
      maxIncome: 500000,
      locations: ["Tamil Nadu"]
    },
    documents: ["Identity Proof", "Income Certificate", "Land Ownership Record", "Bank Account"],
    applicationSteps: ["Submit application with property records", "Site inspection by urban officer", "Phased fund release to bank"],
    tags: ["housing", "welfare", "family"],
    demoMatch: 74,
    eligibilityPreview: ["Household income fits criteria", "Tamil Nadu residency matches", "Land records to be verified"]
  },
  {
    name: "National Health Protection & Coverage (Ayushman Bharat)",
    category: "Healthcare",
    department: "Ministry of Health & Family Welfare",
    level: "Central",
    state: "All India",
    benefit: "Cashless health insurance coverage up to ₹5,00,000/family per year",
    description: "Provides secondary and tertiary hospitalization coverage across empanelled public and private hospitals nationwide.",
    targetAudience: ["Families", "Low-income Households", "Senior Citizens"],
    eligibility: {
      minAge: 0,
      maxAge: 100,
      education: [],
      maxIncome: 600000,
      locations: []
    },
    documents: ["Aadhaar Card", "Ration Card / SECC Data", "Mobile Number"],
    applicationSteps: ["Check eligibility via e-KYC", "Generate Ayushman Gold Card", "Avail cashless treatment at empanelled hospital"],
    tags: ["health", "insurance", "medical"],
    demoMatch: 90,
    eligibilityPreview: ["Universal family health coverage", "Cashless empanelled hospital access", "SECC criteria applicable"]
  },
  {
    name: "PM Krishi & Farmer Income Support",
    category: "Agriculture",
    department: "Ministry of Agriculture & Farmers Welfare",
    level: "Central",
    state: "All India",
    benefit: "Direct income support of ₹6,000/year in 3 equal installments",
    description: "Direct cash transfer into bank accounts of land-holding farmer families to meet agricultural input requirements.",
    targetAudience: ["Farmers", "Rural Households", "Self-employed"],
    eligibility: {
      minAge: 18,
      maxAge: 75,
      education: [],
      maxIncome: 700000,
      locations: []
    },
    documents: ["Aadhaar Card", "Land Records (Khatauni)", "Bank Account Passbook"],
    applicationSteps: ["Register on PM-KISAN portal", "Verify land revenue records", "e-KYC authentication"],
    tags: ["agriculture", "farmer", "income support"],
    demoMatch: 81,
    eligibilityPreview: ["Direct bank transfer scheme", "Landholding record needed", "Central agricultural support"]
  },
  {
    name: "Women Entrepreneurship & Self-Reliance Scheme",
    category: "Women Welfare",
    department: "Social Welfare & Women Empowerment",
    level: "State",
    state: "Tamil Nadu",
    benefit: "Interest subsidy of 5% on micro-loans + seed capital grant of ₹25,000",
    description: "Encourages women-led startups, Self-Help Groups (SHGs), and micro-businesses through capital subsidies and mentorship.",
    targetAudience: ["Women", "Entrepreneurs", "Self-employed"],
    eligibility: {
      minAge: 18,
      maxAge: 55,
      education: ["High School", "Undergraduate", "Graduate", "Diploma"],
      maxIncome: 650000,
      locations: ["Tamil Nadu"]
    },
    documents: ["Identity Proof", "SHG Registration / Business Plan", "Bank Passbook"],
    applicationSteps: ["Form or join registered SHG / Enterprise", "Submit loan application to district bank branch", "Receive subsidy credit"],
    tags: ["women empowerment", "entrepreneurship", "grant"],
    demoMatch: 86,
    eligibilityPreview: ["Women-centric empowerment scheme", "Business training included", "Interest subsidy available"]
  },
  {
    name: "Senior Citizen Pension & Care Assistance",
    category: "Social Security",
    department: "Social Justice & Empowerment",
    level: "State",
    state: "Tamil Nadu",
    benefit: "Monthly pension of ₹1,500 + free healthcare pass and bus transport",
    description: "Monthly financial security and medical welfare benefits for elderly citizens lacking regular income source.",
    targetAudience: ["Senior Citizens", "Elderly"],
    eligibility: {
      minAge: 60,
      maxAge: 100,
      education: [],
      maxIncome: 300000,
      locations: ["Tamil Nadu"]
    },
    documents: ["Age Proof Certificate", "Income Certificate", "Bank Account Details", "Aadhaar Card"],
    applicationSteps: ["Apply at local Revenue Office / e-Seva center", "Field verification by Village Administrative Officer", "Sanction order issued"],
    tags: ["social security", "pension", "senior citizen"],
    demoMatch: 68,
    eligibilityPreview: ["Senior citizen age criteria (60+)", "Monthly pension credit", "Healthcare travel perks included"]
  },
  {
    name: "Financial Inclusion & Micro-Credit Guarantee (Mudra)",
    category: "Financial Services",
    department: "Department of Financial Services",
    level: "Central",
    state: "All India",
    benefit: "Collateral-free business loan up to ₹10,00,000 under Shishu/Kishore/Tarun",
    description: "Refinance support for non-corporate, non-farm small/micro enterprises across manufacturing, trading, and service sectors.",
    targetAudience: ["Self-employed", "Entrepreneurs", "Small Business Owners"],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      education: [],
      maxIncome: 1000000,
      locations: []
    },
    documents: ["KYC Documents", "Business Identity Proof", "Bank Statement (6 months)"],
    applicationSteps: ["Apply via JanSamarth portal or partner bank", "Submit quotation and business proof", "Loan approval & disbursement"],
    tags: ["financial services", "credit", "mudra loan"],
    demoMatch: 87,
    eligibilityPreview: ["Collateral-free credit facility", "Covers micro-businesses", "No processing fee for Shishu category"]
  },
  {
    name: "Digital Skill Literacy & IT Competency Mission",
    category: "Digital Literacy",
    department: "Ministry of Electronics & IT (MeitY)",
    level: "Central",
    state: "All India",
    benefit: "Free online IT certification in coding, cyber safety, and digital tools",
    description: "Free self-paced and classroom training in basic computing, web navigation, office applications, and digital payments.",
    targetAudience: ["Students", "Youth", "Citizens"],
    eligibility: {
      minAge: 14,
      maxAge: 60,
      education: ["High School", "Undergraduate", "Graduate"],
      maxIncome: 800000,
      locations: []
    },
    documents: ["Aadhaar Card", "Student ID / Photo ID"],
    applicationSteps: ["Register on PMGDISHA portal", "Complete 20 hours online training module", "Take online certification test"],
    tags: ["digital literacy", "it training", "certification"],
    demoMatch: 93,
    eligibilityPreview: ["Self-paced digital learning", "Government recognized certificate", "Covers internet and digital tools"]
  },
  {
    name: "Solar Rooftop Subsidy & Clean Energy Drive",
    category: "Renewable Energy",
    department: "Ministry of New and Renewable Energy",
    level: "Central",
    state: "All India",
    benefit: "Direct subsidy up to ₹78,000 for installing 3kW residential solar panels",
    description: "Financial grant for residential homeowners to install rooftop solar power systems and reduce electricity bills.",
    targetAudience: ["Homeowners", "Families", "Housing Societies"],
    eligibility: {
      minAge: 21,
      maxAge: 75,
      education: [],
      maxIncome: 1200000,
      locations: []
    },
    documents: ["Electricity Bill copy", "Property Tax Receipt / Ownership Proof", "Aadhaar Card"],
    applicationSteps: ["Apply on National Solar Rooftop Portal", "Get feasibility approval from local DISCOM", "Installation by empanelled vendor"],
    tags: ["renewable energy", "solar", "subsidy"],
    demoMatch: 77,
    eligibilityPreview: ["Reduces monthly power bills", "Direct Bank Subsidy transfer", "Clean energy initiative"]
  },
  {
    name: "Traditional Artisans Support (PM Vishwakarma)",
    category: "Artisans",
    department: "Ministry of Micro, Small and Medium Enterprises",
    level: "Central",
    state: "All India",
    benefit: "Tool kit incentive of ₹15,000 + collateral-free loan at 5% interest",
    description: "End-to-end holistic support for traditional artisans and craftspeople working with hands and tools in 18 traditional trades.",
    targetAudience: ["Artisans", "Craftspeople", "Self-employed"],
    eligibility: {
      minAge: 18,
      maxAge: 70,
      education: [],
      maxIncome: 600000,
      locations: []
    },
    documents: ["Aadhaar Card", "Ration Card", "Bank Account Details", "Trade Verification"],
    applicationSteps: ["e-KYC enrollment at Common Service Center (CSC)", "Three-tier verification (Gram Panchayat / ULB)", "Receive Vishwakarma ID and toolkit"],
    tags: ["artisans", "handicrafts", "toolkit grant"],
    demoMatch: 82,
    eligibilityPreview: ["Includes ₹15,000 toolkit voucher", "5% concessionary credit", "Official Vishwakarma certificate"]
  },
  {
    name: "Higher Education Overseas Fellowship",
    category: "Education",
    department: "Department of Backward Classes & Minorities Welfare",
    level: "State",
    state: "Tamil Nadu",
    benefit: "Full tuition fee waiver up to ₹20,00,000 for international Master's/PhD",
    description: "Financial assistance for meritorious students pursuing postgraduate or doctoral programs in top ranked global universities.",
    targetAudience: ["Students", "Graduates", "Meritorious Scholars"],
    eligibility: {
      minAge: 20,
      maxAge: 35,
      education: ["Graduate", "Postgraduate"],
      maxIncome: 800000,
      locations: ["Tamil Nadu"]
    },
    documents: ["University Offer Letter", "Degree Certificates & Transcripts", "Income Certificate", "Passport"],
    applicationSteps: ["Apply online with university admission offer", "Scrutiny by state expert committee", "Disbursement of tuition fees"],
    tags: ["education", "overseas scholarship", "higher studies"],
    demoMatch: 89,
    eligibilityPreview: ["Covers top foreign universities", "Full tuition support", "Merit-cum-means selection"]
  },
  {
    name: "Divyangjan Empowerment & Assistive Tech Scheme",
    category: "Disability Support",
    department: "Department for Empowerment of Persons with Disabilities",
    level: "Central",
    state: "All India",
    benefit: "Free high-end assistive aids, motorized tricycles, and smart learning devices",
    description: "Provides durable, modern, and scientifically manufactured assistive aids and appliances to promote physical, social, and economic rehabilitation.",
    targetAudience: ["Persons with Disabilities (PwD)", "Students", "Citizens"],
    eligibility: {
      minAge: 5,
      maxAge: 75,
      education: [],
      maxIncome: 450000,
      locations: []
    },
    documents: ["Disability Certificate (40%+)", "Income Certificate", "Aadhaar Card"],
    applicationSteps: ["Register on ADIP portal", "Attend local assessment camp", "Receive customized assistive device"],
    tags: ["disability support", "assistive aids", "pwd welfare"],
    demoMatch: 80,
    eligibilityPreview: ["Free assistive equipment", "Applies across all districts", "Disability certificate 40%+ required"]
  },
  {
    name: "PM Internship Scheme in Top Companies",
    category: "Skill Development",
    department: "Ministry of Corporate Affairs",
    level: "Central",
    state: "All India",
    benefit: "Monthly stipend of ₹5,000 + one-time grant of ₹6,000 for 12 months",
    description: "Provides youth with 12 months of real-world exposure and hands-on internship opportunities in top 500 Indian companies.",
    targetAudience: ["Students", "Youth", "Undergraduate Students", "Graduates"],
    eligibility: {
      minAge: 21,
      maxAge: 24,
      education: ["High School", "Undergraduate", "Graduate", "Diploma"],
      maxIncome: 800000,
      locations: []
    },
    documents: ["Aadhaar Card", "Educational Certificates", "Bank Passbook"],
    applicationSteps: ["Register on PM Internship Portal", "Select preferred sector & top company profile", "Submit online application for matching"],
    tags: ["internship", "skill development", "youth", "corporate"],
    demoMatch: 85,
    eligibilityPreview: ["12-month corporate internship", "Monthly stipend + grant", "Open across top enterprises"]
  },
  {
    name: "Chief Minister's Breakfast & Nutrition Scheme",
    category: "Child & School Welfare",
    department: "School Education Department",
    level: "State",
    state: "Tamil Nadu",
    benefit: "Free nutritious hot breakfast provided daily to primary school students",
    description: "Ensures primary school children receive balanced nutrition to enhance cognitive development, school attendance, and learning outcomes.",
    targetAudience: ["Students", "Children", "Families"],
    eligibility: {
      minAge: 5,
      maxAge: 12,
      education: ["High School", "Primary"],
      maxIncome: 500000,
      locations: ["Tamil Nadu"]
    },
    documents: ["School Enrollment ID", "Ration Card / Birth Certificate"],
    applicationSteps: ["Automatic enrollment via government primary schools", "Verify student attendance register"],
    tags: ["nutrition", "education", "child welfare", "school"],
    demoMatch: 78,
    eligibilityPreview: ["Free school breakfast program", "Focus on child health & attendance", "State primary school coverage"]
  },
  {
    name: "Kisan Credit Card & Crop Loan Subsidy",
    category: "Agriculture",
    department: "Department of Agriculture & Cooperation",
    level: "Central",
    state: "All India",
    benefit: "Low-interest crop loans at effective 4% interest rate with 3% prompt repayment incentive",
    description: "Offers hassle-free credit to farmers for cultivating crops, purchasing seeds, fertilizers, and meeting post-harvest expenses.",
    targetAudience: ["Farmers", "Rural Households", "Self-employed"],
    eligibility: {
      minAge: 18,
      maxAge: 75,
      education: [],
      maxIncome: 1000000,
      locations: []
    },
    documents: ["Aadhaar Card", "Land Ownership Record (Pattadar Passbook)", "Passport Photograph"],
    applicationSteps: ["Fill KCC application at local bank or CSC", "Attach land revenue records", "Card & credit line issued"],
    tags: ["agriculture", "credit", "farmer loan", "subsidy"],
    demoMatch: 83,
    eligibilityPreview: ["Concessionary 4% interest rate", "Flexible credit line", "Prompt repayment bonus"]
  },
  {
    name: "National Apprenticeship Promotion Scheme (NAPS)",
    category: "Employment",
    department: "Ministry of Skill Development & Entrepreneurship",
    level: "Central",
    state: "All India",
    benefit: "25% of prescribed monthly stipend reimbursed directly to apprentices (up to ₹1,500/month)",
    description: "Promotes apprenticeship training in industrial establishments by sharing financial stipends and course fees.",
    targetAudience: ["Job Seekers", "Youth", "Diploma", "Graduates"],
    eligibility: {
      minAge: 18,
      maxAge: 35,
      education: ["High School", "Diploma", "Undergraduate", "Graduate"],
      maxIncome: 750000,
      locations: []
    },
    documents: ["Aadhaar Card", "ITI / Diploma / Degree Certificate", "Bank Passbook"],
    applicationSteps: ["Register on NAPS Apprenticeship Portal", "Search contracts matching skill domain", "Sign apprenticeship agreement"],
    tags: ["apprenticeship", "employment", "stipend", "vocational"],
    demoMatch: 84,
    eligibilityPreview: ["Government-backed stipend share", "Practical workplace exposure", "Industry-recognized experience"]
  },
  {
    name: "PM Surya Ghar Muft Bijli Yojana",
    category: "Renewable Energy",
    department: "Ministry of New and Renewable Energy",
    level: "Central",
    state: "All India",
    benefit: "Up to 300 units of free electricity every month + subsidy of ₹30,000 to ₹78,000 for rooftop solar",
    description: "Enables 1 crore households to install rooftop solar panels, providing free green electricity and income from surplus power generation.",
    targetAudience: ["Homeowners", "Families", "Citizens"],
    eligibility: {
      minAge: 18,
      maxAge: 80,
      education: [],
      maxIncome: 1500000,
      locations: []
    },
    documents: ["Aadhaar Card", "Latest Electricity Bill", "Roof Ownership / Property Paper"],
    applicationSteps: ["Apply on pmsuryaghar.gov.in portal", "DISCOM feasibility check", "Vendor installation & net meter commissioning"],
    tags: ["free electricity", "solar energy", "suryaghar", "clean power"],
    demoMatch: 91,
    eligibilityPreview: ["Up to 300 units free monthly power", "Direct capital subsidy for solar", "Substantial bill reduction"]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/civicbridge');
    await Scheme.deleteMany({});
    await Scheme.insertMany(schemes);
    console.log(`Successfully seeded ${schemes.length} schemes into MongoDB.`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seed();
