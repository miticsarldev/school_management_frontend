
interface Option {
  value: string;
  label: string;
  image?: string; // Propriété facultative
  endDate?: Date; // Propriété facultative
}
interface Settings {
  endDate?: Date;
  ranges: {
    [key: string]: Date[];
  };
  startDate: Date;
  timePicker: boolean;
}

export const options1 :Option[] = [
  { value: 'Select a View', label: 'Select a View' },
  { value: 'Contact View List', label: 'Contact View List' },
  { value: 'Contact Location View', label: 'Contact Location View' }
];
export const optionssymbol : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: '$', label: '$' },
  { value: '€', label: '€' }
];
export const duration : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'Days', label: 'Days' },
  { value: 'Month', label: 'Month' }
];

export const optionschoose : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'Work', label: 'Work' },
  { value: 'Home', label: 'Home' }
];

export const options : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'NovaWave LLC', label: 'NovaWave LLC' },
  { value: 'SilverHawk', label: 'SilverHawk' },
  { value: 'SummitPeak', label: 'SummitPeak' },
  { value: 'RiverStone Ventur', label: 'RiverStone Ventur' },
  { value: 'China', label: 'China' },
];
export const clientList : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'NovaWave LLC', label: 'NovaWave LLC' },
  { value: 'SilverHawk', label: 'SilverHawk' },
  { value: 'HarborView', label: 'HarborView' },
];
export const category : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'HarborView', label: 'HarborView' },
  { value: 'LLC', label: 'LLC' },
];
export const projectTiming : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Hourly', label: 'Hourly' },
  { value: 'Minutes', label: 'Minutes' },
];

export const optionsource : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'Phone Calls', label: 'Phone Calls' },
  { value: 'Social Media', label: 'Social Media' },
  { value: 'Referral Sites', label: 'Referral Sites' },
  { value: 'Web Analytics', label: 'Web Analytics' },
  { value: 'Previous Purchases', label: 'Previous Purchases' },
];
export const optionindustry : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'Retail Industry', label: 'Retail Industry' },
  { value: 'Banking', label: 'Banking' },
  { value: 'Hotels', label: 'Hotels' },
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Insurance', label: 'Insurance' },
];
export const optiondeals : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'Collins', label: 'Collins' },
  { value: 'Konopelski', label: 'Konopelski' },
  { value: 'Adams', label: 'Adams' },
  { value: 'Schumm', label: 'Schumm' },
  { value: 'Wisozk', label: 'Wisozk' },
];
export const languageOptions : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'English', label: 'English' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Hindi', label: 'Hindi' },
];
export const optionsowner : Option[]= [
  { label: 'Jerald', value: 'Jerald', image: 'assets/img/profiles/avatar-14.jpg' },
  { label: 'Sharon Roy', value: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
  { label: 'Vaughan', value: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
  { label: 'Jessica', value: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
  { label: 'Carol Thomas', value: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' }
];
export const optionsowner1 : Option[]= [
  { label: 'Darlee Robertson', value: 'Jerald', image: 'assets/img/profiles/avatar-19.jpg' },
  { label: 'Sharon Roy', value: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
  { label: 'Vaughan', value: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
  { label: 'Jessica', value: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
  { label: 'Carol Thomas', value: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' }
];

export const countryoptions1 : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'India', label: 'India' },
  { value: 'USA', label: 'USA' },
  { value: 'France', label: 'France' },
  { value: 'UK', label: 'UK' },
  { value: 'UAE', label: 'UAE' },

];
export const lastModified : Option[]= [
  { value: "sortByDate", label: "Sort by Date" },
  { value: "Ascending", label: "Ascending" },
  { value: "Descending", label: "Descending" },
  { value: "Recently Viewed", label: "Recently Viewed" },
  { value: "Recently Added", label: "Recently Added" },
  { value: "Creation Date", label: "Creation Date" },
];
export const recent : Option[]= [
  { value: "sortByDate", label: "Recent" },
  { value: "Last Modified", label: "Last Modified" },
  { value: "Last Modified by me", label: "Last Modified by me" },
];
export const companyName : Option[]= [
  { value: 'choose', label: 'Choose' },
  { value: 'novaWave', label: 'NovaWave LLC' },
  { value: 'blueSky', label: 'BlueSky Industries' },
  { value: 'silverHawk', label: 'SilverHawk' },
  { value: 'summitPeak', label: 'SummitPeak' },
  { value: 'riverStone', label: 'RiverStone Ventur' }
];

export const initialSettings : Settings= {
  endDate: new Date("2020-08-11T12:30:00.000Z"),
  ranges: {
    "Last 30 Days": [
      new Date("2020-07-12T04:57:17.076Z"),
      new Date("2020-08-10T04:57:17.076Z"),
    ],
    "Last 7 Days": [
      new Date("2020-08-04T04:57:17.076Z"),
      new Date("2020-08-10T04:57:17.076Z"),
    ],
    "Last Month": [
      new Date("2020-06-30T18:30:00.000Z"),
      new Date("2020-07-31T18:29:59.999Z"),
    ],
    "This Month": [
      new Date("2020-07-31T18:30:00.000Z"),
      new Date("2020-08-31T18:29:59.999Z"),
    ],
    Today: [
      new Date("2020-08-10T04:57:17.076Z"),
      new Date("2020-08-10T04:57:17.076Z"),
    ],
    Yesterday: [
      new Date("2020-08-09T04:57:17.076Z"),
      new Date("2020-08-09T04:57:17.076Z"),
    ],
  },
  startDate: new Date("2020-08-04T04:57:17.076Z"), // Set "Last 7 Days" as default
  timePicker: false,
};



export const salestypelist : Option[]= [
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'calls', label: 'Calls' }
];
export const project : Option[]= [
  { value: 'Devops Design', label: 'Devops Design' },
  { value: 'MargrateDesign', label: 'MargrateDesign' },
  { value: 'UI for Chat', label: 'UI for Chat' },
  { value: 'Web Chat', label: 'Web Chat' },
];
export const defaultValues : Option[]= [
  { value: 'Devops Design', label: 'Devops Design' },
  { value: 'MargrateDesign', label: 'MargrateDesign' },
  { value: 'UI for Chat', label: 'UI for Chat' }
];

export const socialMedia : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Google', label: 'Google' },
  { value: 'Social Media', label: 'Social Media' },
];
export const priorityList : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Highy', label: 'Highy' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
];
export const tagInputValues : Option[]= [
  { value: 'Devops Design', label: 'Devops Design' },
  { value: 'MargrateDesign', label: 'MargrateDesign' },
];
export const projectType : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'Mobile App', label: 'Mobile App' },
  { value: 'Meeting', label: 'Meeting' },
];
export const status1 : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: 'Mobile App', label: 'Mobile App' },
  { value: 'Meeting', label: 'Meeting' },
];

export const ascendingandDecending : Option[]= [
  { value: 'Sort By Date', label: 'Sort By Date' },
  { value: 'Ascending', label: 'Ascending' },
  { value: 'Descending', label: 'Descending' },
];
export const statusList : Option[]= [
  { value: 'Busy', label: 'Busy' },
  { value: 'Unavailable', label: 'Unavailable' },
  { value: 'No Answer', label: 'No Answer' },
  { value: 'Wrong Number', label: 'Wrong Number' },
  { value: 'Left Voice Message', label: 'Left Voice Message' },
  { value: 'Moving Forward', label: 'Moving Forward' },
];
export const owner : Option[]= [
  { value: 'Jerald', label: 'Jerald' },
  { value: 'Guillory', label: 'Guillory' },
  { value: 'Jami', label: 'Jami' },
  { value: 'Theresa', label: 'Theresa' },
  { value: ' Espinosa', label: ' Espinosa' },
];
export const assigneeOption : Option[]= [
  { value: 'Darlee Robertson', label: 'Darlee Robertson', image: 'assets/img/profiles/avatar-19.jpg' },
  { value: 'Sharon Roy', label: 'Sharon Roy', image: 'assets/img/profiles/avatar-20.jpg' },
  { value: 'Vaughan', label: 'Vaughan', image: 'assets/img/profiles/avatar-21.jpg' },
  { value: 'Jessica', label: 'Jessica', image: 'assets/img/profiles/avatar-23.jpg' },
  { value: 'Carol Thomas', label: 'Carol Thomas', image: 'assets/img/profiles/avatar-16.jpg' }
];
export const ratings : Option[]= [
  { value: '', label: 'Choose(1-5)' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];
export const priority : Option[]= [
  { value: '', label: 'Choose' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
]
export const statusOption : Option[]= [
  { value: 'Closed', label: 'Closed' },
  { value: 'Open', label: 'Open' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Reopened', label: 'Reopened' },
  { value: 'Inprogress', label: 'Inprogress' },
];
export const newselectOption : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Truelysell', label: 'Truelysell' },
  { value: 'Dreamsports', label: 'Dreamsports' },
  { value: 'Doccure', label: 'Doccure' },
  { value: 'Kofejob', label: 'Kofejob' },
];
export const releatdselectOption : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Truelysell', label: 'Truelysell' },
  { value: 'Dreamsports', label: 'Dreamsports' },
  { value: 'Doccure', label: 'Doccure' },
  { value: 'Kofejob', label: 'Kofejob' },
  { value: 'Best@laundry', label: 'Best@laundry' },
];
export const editreleatdselectOption : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Deals', label: 'Deals' },
  { value: 'Truelysell', label: 'Truelysell' },
  { value: 'Dreamsports', label: 'Dreamsports' },
  { value: 'Doccure', label: 'Doccure' },
  { value: 'Kofejob', label: 'Kofejob' },
  { value: 'Best@laundry', label: 'Best@laundry' },
];
export const dealsselectOption : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Collins', label: 'Collins' },
  { value: 'Best@laundry', label: 'Best@laundry' },
  { value: 'Dreamsports', label: 'Dreamsports' },
  { value: 'Doccure', label: 'Doccure' },
  { value: 'Kofejob', label: 'Kofejob' },

];
export const currency : Option[]= [
  { value: '$', label: '$' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
]
export const contracts : Option[]= [
  { value: 'Contracts under Seal', label: 'Contracts under Seal' },
  { value: 'Meeting', label: 'Meeting' },
]
export const client : Option[]= [
  { value: 'Harbor View', label: 'Harbor View' },
  { value: 'CoastalStar Co.', label: 'CoastalStar Co.' },
  { value: 'RiverStone Ventur.', label: 'RiverStone Ventur.' },
]
export const contracttype : Option[]= [
  { value: 'Contracts under Seal', label: 'Contracts under Seal' },
  { value: 'Contract', label: 'Contract' },
  { value: 'RiverStone Ventur', label: 'RiverStone Ventur' },
]
export const currencyselect : Option[]= [
  { value: 'Choose', label: 'Choose' },
  { value: '$', label: '$' },
  { value: 'INR', label: 'INR' },
  { value: 'Euro', label: 'Euro' },
]



// preskool

export const names : Option[]= [
  { value: "James", label: "James" },
  { value: "Joseph", label: "Joseph" },
  { value: "Kathlen", label: "Kathlen" },
  { value: "Marilyn", label: "Marilyn" },
];
export const gender : Option[]= [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
export const status : Option[]= [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];
export const Marital : Option[]= [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
];
export const Contract : Option[]= [
  { value: "Permanent", label: "Permanent" },
  { value: "Temporary", label: "Temporary" },
];
export const bloodGroup : Option[]= [
  { value: "O +ve", label: "O +ve" },
  { value: "O -ve", label: "O -ve" },
  { value: "B +ve", label: "B +ve" },
];
export const house : Option[]= [
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
];
export const religion : Option[]= [
  { value: "Christianity", label: "Christianity" },
  { value: "Buddhism", label: "Buddhism" },
  { value: "Irreligion", label: "Irreligion" },
];
export const cast : Option[]= [
  { value: "BC", label: "BC" },
  { value: "OC", label: "OC" },
];
export const mothertongue : Option[]= [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
];
export const rollno : Option[]= [
  { value: "35010", label: "35010" },
  { value: "35011", label: "35011" },
  { value: "35013", label: "35013" },
];
export const AdmissionNo : Option[]= [
  { value: "AD9892432", label: "AD9892432" },
  { value: "AD9892433", label: "AD9892433" },
  { value: "AD9892434", label: "AD9892434" },
];
export const route : Option[]= [
  { value: "Newyork", label: "Newyork" },
  { value: "Denver", label: "Denver" },
  { value: "Chicago", label: "Chicago" },
];
export const VehicleNumber : Option[]= [
  { value: "AM 54548", label: "AM 54548" },
  { value: "AM 55548", label: "AM 55548" },
  { value: "AM 84548", label: "AM 84548" },
];
export const PickupPoint : Option[]= [
  { value: "Cincinatti", label: "Cincinatti" },
  { value: "Illinois", label: "Illinois" },
  { value: "Morgan", label: "Morgan" },
];
export const Hostel : Option[]= [
  { value: "Phoenix Residence", label: "Phoenix Residence" },
  { value: "Tranquil Haven", label: "Tranquil Haven" },
  { value: "Radiant Towers", label: "Radiant Towers" },
  { value: "Nova Nest", label: "Nova Nest" },
];
export const roomNO : Option[]= [
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "223", label: "223" },
  { value: "12", label: "12" },

];
export const paymentType : Option[]= [
  { value: "Paytm", label: "Paytm" },
  { value: "Cash On Delivery", label: "Cash On Delivery" },
];
export const feesTypes : Option[]= [
  { value: "Tuition Fees", label: "Tuition Fees" },
  { value: "Monthly Fees", label: "Monthly Fees" },
  { value: "Admission Fees", label: "Admission Fees" },
  { value: "1st Installment Fees", label: "1st Installment Fees" },
  { value: "Topper Discount", label: "Topper Discount" },
  { value: "Bus Fees", label: "Bus Fees" },
  { value: "3rd Installment Fees", label: "3rd Installment Fees" },
  { value: "4rd Installment Fees", label: "4rd Installment Fees" },
  { value: "5rd Installment Fees", label: "5rd Installment Fees" },
];
export const feeGroup : Option[]= [
  { value: "Select Fees Group", label: "Select Fees Group" },
  { value: "Monthly Fees", label: "Monthly Fees" },
  { value: "Admission-Fees", label: "Admission-Fees" },
  { value: "Class 1 General", label: "Class 1 General" },
  { value: "Class 1- I Installment", label: "Class 1- I Installment" },
  { value: "Class 1- II Installment", label: "Class 1- II Installment" },
  { value: "Class 1- III Installment", label: "Class 1- III Installment" },
  { value: "Discount", label: "Discount" },
];
export const allSection : Option[]= [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
];
export const amount : Option[]= [
  { value: "2000", label: "2000" },
  { value: "500", label: "500" },
  { value: "5000", label: "5000" },
  { value: "8000", label: "8000" },
];
export const fineType : Option[]= [
  { value: "Percentage", label: "Percentage" },
  { value: "Fixed", label: "Fixed" },
];
export const DueDate : Option[]= [
  { value: "30 Jan 2025", label: "30 Jan 2025" },
  { value: "03 Sep 2025", label: "03 Sep 2025" },
];
export const leaveType : Option[]= [
  { value: "Medical Leave", label: "Medical Leave" },
  { value: "Special Leave", label: "Special Leave" },
  { value: "Casual Leave", label: "Casual Leave" },
  { value: "Maternity Leave", label: "Maternity Leave" },
];
export const allClass : Option[]= [
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
];
export const allSubject : Option[]= [
  { value: "Physics", label: "Physics" },
  { value: "Computer", label: "Computer" },
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
];
export const academicYear : Option[]= [
  { value: "June 2024/25", label: "June 2024/25" },
  { value: "June 2023/24", label: "June 2023/24" },
  { value: "June 2022/23", label: "June 2022/23" },
];
export const Reason : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Teacher", label: "Teacher" },
  { value: "Student", label: "Student" },
  { value: "Staff", label: "Staff" },
];
export const acadamicReason : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Pregnancy", label: "Pregnancy" },
  { value: "Fees Unpaid", label: "Fees Unpaid" },
  { value: "Complaint", label: "Complaint" },
];
export const classSylabus : Option[]= [
  { value: "Select", label: "Select" },
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
];
export const classSection : Option[]= [
  { value: "Select", label: "Select" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
];
export const language : Option[]= [
  { value: "Select", label: "Select" },
  { value: "English", label: "English" },
  { value: "Maths", label: "Maths" },
  { value: "Physics", label: "Physics" },
];
export const count : Option[]= [
  { value: "Select", label: "Select" },
  { value: "101", label: "101" },
  { value: "102", label: "102" },
  { value: "103", label: "103" },
];
export const typetheory : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Theory", label: "Theory" },
  { value: "Practical", label: "Practical" },
];
export const startTime : Option[]= [
  { value: "Select", label: "Select" },
  { value: "09:30 AM", label: "09:30 AM" },
  { value: "10:30 AM", label: "10:30 AM" },
  { value: "12:30 PM", label: "12:30 PM" },
];
export const classselect : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Class", label: "Class" },

];
export const empty : Option[]= [
  { value: "Select", label: "Select" },
];
export const activeList : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];
export const capacitycount : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: '50', label: '50' },
  { value: '40', label: '40' },
  { value: '60', label: '60' },
];
export const weak : Option[]= [
  { value: 'Select', label: 'Select' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
];
export const durationOne : Option[]= [
  { value: "Select", label: "Select" },
  { value: "3 hrs", label: "3 hrs" },
];

export const examtwo : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Week Test", label: "Week Test" },
  { value: "Monthly Test", label: "Monthly Test" },
  { value: "Chapter Wise Test", label: "Chapter Wise Test" },
];

export const examOne : Option[]= [
  { value: "Select", label: "Select" },
  { value: "13 May 2024", label: "13 May 2024" },
  { value: "27 May 2024", label: "27 May 2024" },
  { value: "05 Jun 2024", label: "05 Jun 2024" },
];

export const startTimeOne : Option[]= [
  { value: "Select", label: "Select" },
  { value: "10:45 AM", label: "10:45 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "11:30 AM", label: "11:30 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
];

export const maxMark : Option[]= [
  { value: "Select", label: "Select" },
  { value: "100", label: "100" },
];

export const minMark : Option[]= [
  { value: "Select", label: "Select" },
  { value: "35", label: "35" },
];

export const gradeOne : Option[]= [
  { value: "Select", label: "Select" },
  { value: "O", label: "O" },
  { value: "A+", label: "A+" },
  { value: "A", label: "A" },
];

export const gradePercentage : Option[]= [
  { value: "Select", label: "Select" },
  { value: "90% - 100%", label: "90% - 100%" },
  { value: "80% - 90%", label: "80% - 90%" },
  { value: "70% - 80%", label: "70% - 80%" },
];

export const marksFrom : Option[]= [
  { value: "Select", label: "Select" },
  { value: "90", label: "90" },
];

export const marksUpto : Option[]= [
  { value: "Select", label: "Select" },
  { value: "100", label: "100" },
];

export const gradePoints : Option[]= [
  { value: "Select", label: "Select" },
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
];

export const staffName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Kevin", label: "Kevin" },
  { value: "Willie", label: "Willie" },
  { value: "Daniel", label: "Daniel" },
  { value: "Teresa", label: "Teresa" },
  { value: "Johnson", label: "Johnson" },
];

export const departmentName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Admin", label: "Admin" },
  { value: "Management", label: "Management" },
  { value: "Finance", label: "Finance" },
];

export const designationName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Technical Head", label: "Technical Head" },
  { value: "Receptionist", label: "Receptionist" },
  { value: "Admin", label: "Admin" },
  { value: "Accountant", label: "Accountant" },
  { value: "HR Manager", label: "HR Manager" },
];

export const morefilterStaff : Option[]= [
  { value: "Select", label: "Select" },
  { value: "ID", label: "ID" },
  { value: "Name", label: "Name" },
  { value: "Department", label: "Department" },
  { value: "Designation", label: "Designation" },
  { value: "Email", label: "Email" },
];

export const departmentSelect : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Admin", label: "Admin" },
  { value: "Finance", label: "Finance" },
  { value: "Academic", label: "Academic" },
  { value: "Library", label: "Library" },
  { value: "Health", label: "Health" },
];
export const routinename : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Erickson", label: "Erickson" },
  { value: "Mori", label: "Mori" },
  { value: "Joseph", label: "Joseph" },

];
export const Shift : Option[]= [
  { value: "Morning", label: "Morning" },
  { value: "Afternoon", label: "Afternoon" },

];
export const promotion : Option[]= [
  { value: "No Promotion", label: "No Promotion" },
  { value: "Promote to IV", label: "Promote to IV" },

];

export const teacher : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Hellana", label: "Hellana" },
  { value: "Erickson", label: "Erickson" },
  { value: "Teresa", label: "Teresa" },
  { value: "Aaron", label: "Aaron" },
];
export const Time : Option[]= [
  { value: "Select", label: "Select" },
  { value: "09:00", label: "09:00" },
  { value: "09:45", label: "09:45" },
  { value: "10:45", label: "10:45" },
  { value: "11:30", label: "11:30" },
];
export const Timeto : Option[]= [
  { value: "Select", label: "Select" },
  { value: "09:45", label: "09:45" },
  { value: "10:45", label: "10:45" },
  { value: "11:30", label: "11:30" },
  { value: "12:15", label: "12:15" },
];
export const subjectGroup : Option[]= [
  { value: "Select", label: "Select" },
  { value: "09:45", label: "09:45" },
  { value: "10:45", label: "10:45" },
  { value: "11:30", label: "11:30" },
  { value: "12:15", label: "12:15" },
];
export const period : Option[]= [
  { value: "Select", label: "Select" },
  { value: "09:00 AM", label: "09:45 AM" },
  { value: "09:45 AM", label: "09:45 AM" },
  { value: "10:45 AM", label: "10:45 AM" },
];
export const classduration : Option[]= [
  { value: "Select", label: "Select" },
  { value: "45 Mins", label: "45 Mins" },
  { value: "1 Hour", label: "1 Hour" },
];
export const weeklytest : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Weekly Test", label: "Weekly Test" },
  { value: "Monthly Test", label: "Monthly Test" },
  { value: "Chapter Wise Test", label: "Chapter Wise Test" },
];
export const holidays : Option[]= [
  { value: "Select", label: "Select" },
  { value: "New Year", label: "New Year" },
  { value: "Martin Luther King Jr. Day", label: "Martin Luther King Jr. Day" },
  { value: "Presidents' Day", label: "Presidents' Day" },
];
export const month : Option[]= [
  { value: "Select", label: "Select" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "june", label: "june" },
];
export const months : Option[]= [
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "june", label: "june" },
];
export const year : Option[]= [
  { value: "Select", label: "Select" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];
export const parent : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Johnson", label: "Johnson" },
  { value: "Marquita", label: "Marquita" },
  { value: "Thomas", label: "Thomas" },
];
export const ids : Option[]= [
  { value: "Select", label: "Select" },
  { value: "FG80482", label: "FG80482" },
  { value: "FG80481", label: "FG80481" },
  { value: "FG80480", label: "FG80480" },
]
export const Role : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Student", label: "Student" },
  { value: "Teacher", label: "Teacher" },
  { value: "Admin", label: "Admin" },
];
export const MonthDate : Option[]= [
  { value: "05 May 2024 - 07 may 2024", label: "05 May 2024 - 07 may 2024" },
  { value: "07 May 2024 - 07 may 2024", label: "07 May 2024 - 07 may 2024" },
  { value: "08 May 2024 - 19 may 2024", label: "08 May 2024 - 19 may 2024" },
];
export const AdmissionNumber : Option[]= [
  { value: "Select", label: "Select" },
  { value: "AD9892424", label: "AD9892424" },
  { value: "AD9892425", label: "AD9892425" },
  { value: "AD9892426", label: "AD9892426" },
];
export const RollNumber : Option[]= [
  { value: "Select", label: "Select" },
  { value: "35004", label: "35004" },
  { value: "35005", label: "35005" },
  { value: "35006", label: "35006" },
];
export const studentName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Janet", label: "Janet" },
  { value: "Joann", label: "Joann" },
  { value: "Kathleen", label: "Kathleen" },
  { value: "Gifford", label: "Gifford" },
];
export const studentclass : Option[]= [
  { value: "Select", label: "Select" },
  { value: "XI", label: "XI" },
  { value: "VII", label: "VII" },
  { value: "VIII", label: "VIII" },
];
export const teacherId : Option[]= [
  { value: "Select", label: "Select" },
  { value: "T849127", label: "T849127" },
  { value: "T849125", label: "T849125" },
  { value: "T849126", label: "T849126" },
];
export const attendance : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Present", label: "Present" },
  { value: "Absent", label: "Absent" },
  { value: "Late", label: "Late" },
];
export const staffrole : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Teacher", label: "Teacher" },
  { value: "Accountant", label: "Accountant" },
  { value: "Librarian", label: "Librarian" },
];
export const roomno : Option[]= [
  { value: "20", label: "20" },
  { value: "22", label: "22" },
  { value: "24", label: "24" },
  { value: "26", label: "26" },
];
export const staffDepartment : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Admin", label: "Admin" },
  { value: "Management", label: "Management" },
  { value: "Academic", label: "Academic" },
  { value: "Library", label: "Library" },
];

export const expenseName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Monthly Electricity", label: "Monthly Electricity" },
  { value: "Teacher Salary", label: "Teacher Salary" },
  { value: "AC Repair", label: "AC Repair" },
];
export const category2 : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Utilities", label: "Utilities" },
  { value: "Salaries", label: "Salaries" },
  { value: "Maintenance", label: "Maintenance" },
];
export const invoiceNumber : Option[]= [
  { value: "Select", label: "Select" },
  { value: "INV681537", label: "INV681537" },
  { value: "INV681536", label: "INV681536" },
  { value: "INV681535", label: "INV681535" },
];
export const paymentMethod : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Cash", label: "Cash" },
  { value: "Credit", label: "Credit" },
];
export const incomeName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "April Month Fees", label: "April Month Fees" },
  { value: "STEM Program Grant", label: "STEM Program Grant" },
  { value: "Alumni Scholarship", label: "Alumni Scholarship" },
];
export const source : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Tuition Fees", label: "Tuition Fees" },
  { value: "Government Grants", label: "Government Grants" },
  { value: "Donations", label: "Donations" },
];
export const transactionId : Option[]= [
  { value: "Select", label: "Select" },
  { value: "FT624893", label: "FT624893" },
  { value: "FT624892", label: "FT624892" },
  { value: "FT624891", label: "FT624891" },
];
export const transactionType : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Income", label: "Income" },
  { value: "Expense", label: "Expense" },
];
export const transactionDate : Option[]= [
  { value: "Select", label: "Select" },
  { value: "25 Apr 2024", label: "25 Apr 2024" },
  { value: "27 Apr 2024", label: "27 Apr 2024" },
  { value: "03 May 2024", label: "03 May 2024" },
];
export const customerName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Ralph Claudia", label: "Ralph Claudia" },
  { value: "Julie Scott", label: "Julie Scott" },
  { value: "Maria", label: "Maria" },
];
export const productName : Option[]= [
  { value: "Select", label: "Select" },
  { value: "STEM Program Grant", label: "STEM Program Grant" },
  { value: "Uniform", label: "Uniform" },
  { value: "Library Donation", label: "Library Donation" },
];

export const members : Option[]= [
  { value: 'Collins', label: 'Collins' },
  { value: 'Konopelski', label: 'Konopelski' },
  { value: 'Adams', label: 'Adams' },
  { value: 'Schumm', label: 'Schumm' },
  { value: 'Wisozk', label: 'Wisozk' },
];
export const cardNo : Option[]= [
  { value: '501', label: '501' },
  { value: '502', label: '502' },
  { value: '503', label: '503' },
  { value: '504', label: '504' },
];
export const moreFilter : Option[]= [
  { value: 'Members', label: 'Members' },
  { value: 'Card No', label: 'Card No' },
  { value: 'Email', label: 'Email' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Date Of join', label: 'Date Of join' },
];
export const moreFilterBook : Option[]= [
  { value: 'ID', label: 'ID' },
  { value: 'Book Name', label: 'Book Name' },
  { value: 'Book No', label: 'Book No' },
  { value: 'Publisher', label: 'Publisher' },
  { value: 'Subject', label: 'Subject' },
  { value: 'Rack No', label: 'Rack No' },
];
export const moreFilterBookIssue : Option[]= [
  { value: 'ID', label: 'ID' },
  { value: 'Date of Issue', label: 'Date of Issue' },
  { value: 'Due Date', label: 'Due Date' },
  { value: 'Issue To', label: 'Issue To' },
  { value: 'Books Issued', label: 'Books Issued' },
  { value: 'Book ReturnedID', label: 'Book Returned' },
  { value: 'Issue Remarks', label: 'Issue Remarks' },

];
export const playersName : Option[]= [
  { value: 'Francis', label: 'Francis' },
  { value: 'Cheryl', label: 'Cheryl' },
  { value: 'Daniel', label: 'Daniel' },
  { value: 'Irene', label: 'Irene' },
  { value: 'Keith', label: 'Keith' },
];
export const coachName : Option[]= [
  { value: 'Thomas', label: 'Thomas' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Nicholas', label: 'Nicholas' },
  { value: 'Sandra', label: 'Sandra' },
];
export const hostelName : Option[]= [
  { value: '1', label: 'Phoenix Residence' },
  { value: '2', label: 'Tranquil Haven' },
  { value: '3', label: 'Radiant Towers' },
  { value: '4', label: 'Nova Nest' },
  { value: '5', label: 'Vista Villa' },
];
export const HostelroomNo : Option[]= [
  { value: '1', label: 'A1' },
  { value: '2', label: 'A2' },
  { value: '3', label: 'A3' },
  { value: '4', label: 'B1' },
  { value: '5', label: 'B2' },
];
export const hostelType : Option[]= [
  { value: '1', label: 'Boys' },
  { value: '2', label: 'Girls' },
];
export const moreFilterHostel : Option[]= [
  { value: '1', label: 'Hostel Name' },
  { value: '2', label: 'Hostel Type' },
  { value: '3', label: 'Address' },
  { value: '4', label: 'Intake' },
  { value: '5', label: 'Description' },
];
export const moreFilterRoom : Option[]= [
  { value: '1', label: 'Room No' },
  { value: '2', label: 'Hostel Name' },
  { value: '3', label: 'Room Type' },
  { value: '4', label: 'No of Bed' },
  { value: '5', label: 'Cost per Bed' },
];
export const roomtype : Option[]= [
  { value: '1', label: 'One Bed' },
  { value: '2', label: 'One Bed AC' },
  { value: '3', label: 'Two Bed' },
  { value: '4', label: 'Two Bed AC' }
];
export const bedcount : Option[]= [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
];
export const moreFilterSport : Option[]= [
  { value: 'ID', label: 'ID' },
  { value: 'Name', label: 'Name' },
  { value: 'Coach', label: 'Coach' },
  { value: 'Started Year', label: 'Started Year' },
  { value: 'Action', label: 'Action' },
];
export const sports : Option[]= [
  { value: 'Cricket', label: 'Cricket' },
  { value: 'Throwball', label: 'Throwball' },
  { value: 'Football', label: 'Football' },
  { value: 'Tennis', label: 'Tennis' },
  

];
export const membershipplan : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Starter Pack", label: "Starter Pack" },
  { value: "Enterprise", label: "Enterprise" },
  { value: "Premium Pack", label: "Premium Pack" },
];
export const school : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Green Valley High School", label: "Green Valley High School" },
  { value: "Riverside Academy", label: "Riverside Academy" },
  { value: "Sunshine School", label: "Sunshine School" },
];
export const messageTo : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Staff", label: "Staff" },
  { value: "Student", label: "Student" },
  { value: "Teacher", label: "Teacher" },
  { value: "Parent", label: "Parent" },
];
export const classes : Option[]= [
  { value: "All Classes", label: "All Classes" },
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
];
export const sections : Option[]= [
  { value: "All Sections", label: "All Sections" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
]
export const eventCategory : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Celebration", label: "Celebration" },
  { value: "Training", label: "Training" },
  { value: "Meeting", label: "Meeting" },
  { value: "Holidays", label: "Holidays" },
]

export const codeLanguage : Option[]= [
  { value: "Select", label: "Select" },
  { value: "en", label: "en" },
  { value: "ar", label: "ar" },
  { value: "zh", label: "zh" },
]

export const customeFields : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Expense", label: "Expense" },
  { value: "Inventory", label: "Inventory" },
]

export const editcustomeFields : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Expense", label: "Expense" },
  { value: "Inventory", label: "Inventory" },
]

export const otpSet : Option[]= [
  { value: "SMS", label: "SMS" },
  { value: "Email", label: "Email" },
]

export const otpSetNum : Option[]= [
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
]

export const otpSetMin : Option[]= [
  { value: "5 mins", label: "5 mins" },
  { value: "2 mins", label: "2 mins" },
  { value: "10 mins", label: "10 mins" },
]

export const gdprCookies : Option[]= [
  { value: "Right", label: "Right" },
  { value: "Left", label: "Left" },
  { value: "Center", label: "Center" },
]
export const page : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Students", label: "Students" },
  { value: "Teachers", label: "Teachers" },
  { value: "Parents", label: "Parents" },
]
export const questions : Option[]= [
  { value: "Select", label: "Select" },
  { value: "How do I reset my password?", label: "How do I reset my password?" },
  { value: "Can I volunteer at the school?", label: "Can I volunteer at the school?" },
  { value: "What are the school's hours of operation?", label: "What are the school's hours of operation?" },
]
export const category3 : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Account", label: "Account" },
  { value: "Support", label: "Support" },
  { value: "Finance", label: "Finance" },
]
export const city : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "New York City", label: "New York City" },
  { value: "Houston", label: "Houston" },
]
export const state : Option[]= [
  { value: "Select", label: "Select" },
  { value: "California", label: "California" },
  { value: "New York", label: "New York" },
  { value: "Texas", label: "Texas" },
]
export const country : Option[]= [
  { value: "Select", label: "Select" },
  { value: "United States", label: "United States" },
  { value: "Germany", label: "Germany" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
]
export const code : Option[]= [
  { value: "Select", label: "Select" },
  { value: "US", label: "US" },
  { value: "CA", label: "CA" },
  { value: "UK", label: "UK" },
]
export const category4 : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Education", label: "Education" },
  { value: "Clear Goals", label: "Clear Goals" },
  { value: "Advice", label: "Advice" },
]
export const author : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Jordan", label: "Jordan" },
  { value: "Rubiaana", label: "Rubiaana" },
  { value: "Daniel", label: "Daniel" },
]
export const tags : Option[]= [
  { value: "Select", label: "Select" },
  { value: "Guide", label: "Guide" },
  { value: "Development", label: "Development" },
  { value: "Education", label: "Education" },
  { value: "Sports", label: "Sports" },
]
export const publish : Option[]= [
  { value: "Unpublish", label: "Unpublish" },
  { value: "Publish", label: "Publish" },
]
export const date : Option[]= [
  { value: "Select", label: "Select" },
  { value: "25 May 2024", label: "25 May 2024" },
  { value: "15 May 2024", label: "15 May 2024" },
  { value: "27 May 2024", label: "27 May 2024" },
]
export const assigned : Option[]= [
  { value: "Janet", label: "Janet" },
  { value: "Joann", label: "Joann" },
  { value: "Gifford", label: "Gifford" },
]
export const ticketDate : Option[]= [
  { value: "22 May 2024", label: "22 May 2024" },
  { value: "23 May 2024", label: "23 May 2024" },
  { value: "24 May 2024", label: "24 May 2024" },
]
export const markAs : Option[]= [
  { value: "Mark as Public", label: "Mark as Public" },
  { value: "Mark as Private", label: "Mark as Private" },
]
export const internetCategory : Option[]= [
  { value: "Internet Issue", label: "Internet Issue" },
  { value: "Redistribute", label: "Redistribute" },
  { value: "Computer", label: "Computer" },
  { value: "Complaint", label: "Complaint" },
]
export const ticketStatus : Option[]= [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
  { value: "Medium", label: "Medium" },
]
export const routesList : Option[]= [
  { value: "1", label: "Seattle" },
  { value: "2", label: "Brooklyn Central" },
  { value: "3", label: "Rochester" },
  { value: "4", label: "Kansas City" },
  { value: "5", label: "Brooklyn North" },
]
export const driverName : Option[]= [
  { value: "1", label: "Thomas" },
  { value: "2", label: "Mary" },
  { value: "3", label: "Michael" },
  { value: "4", label: "Jessie" },
  { value: "5", label: "Robert" },
]
export const GPSDevice : Option[]= [
  { value: "1", label: "GPS3254789541" },
  { value: "2", label: "GPS1478545214" },
  { value: "3", label: "GPS4579454785" },
  { value: "4", label: "GPS7899456689" },
]
export const AttendanceTypeList : Option[]= [
  { value: "1", label: "Present" },
  { value: "2", label: "Half Day" },
  { value: "3", label: "Absent" },
  { value: "4", label: "Holiday" },
]
export const driverFilter3 : Option[]= [
  { value: "1", label: "ID" },
  { value: "2", label: "Route" },
  { value: "3", label: "Pickup Point" },
  { value: "4", label: "Vehicle" },
  { value: "5", label: "Driver" },
  { value: "6", label: "Status" },
]
export const driverFilter : Option[]= [
  { value: "1", label: "ID" },
  { value: "2", label: "Driver" },
  { value: "3", label: "Phone Number" },
  { value: "4", label: "Driver License No" },
  { value: "5", label: "Address" },
  { value: "6", label: "Status" },
]
export const driverFilter2 : Option[]= [
  { value: "1", label: "ID" },
  { value: "2", label: "Vehicle No" },
  { value: "3", label: "Vehicle Model" },
  { value: "4", label: "Made of Year" },
  { value: "5", label: "Registration No" },
  { value: "6", label: "Status" },
]
export const vehicleModel : Option[]= [
  { value: "1", label: "Scania" },
  { value: "2", label: "Mini Bus" },
  { value: "3", label: "Kinsmart " },
  { value: "4", label: "Single deck" },
]
export const PickupPoint2 : Option[]= [
  { value: "1", label: "2603 Wood Duck Drive Marquette, MI" },
  { value: "2", label: "3521 Harvest Lane Kansas City, MO " },
  { value: "3", label: "4025 Khale Street, Folly Beach, SC" },
  { value: "4", label: "2261 Sweetwood Drive, Denver, CO " },
  { value: "5", label: "3341 Palmer Road, Columbus, OH" },
]
export const contactMess : Option[]= [
  { value: "Reminder: Staff meeting tomorrow.", label: "Reminder: Staff meeting tomorrow." },
  { value: "Sure, let's discuss it in class.", label: "Sure, let's discuss it in class." },
  { value: "Requesting a meeting for next week.", label: "Requesting a meeting for next week." },
]
export const contactMessOne : Option[]= [
  { value: "Reminder: Staff meeting tomorrow.", label: "Reminder: Staff meeting tomorrow." },
  { value: "Sure, let's discuss it in class.", label: "Sure, let's discuss it in class." },
  { value: "Requesting a meeting for next week.", label: "Requesting a meeting for next week." },
]
export const studentsnumber : Option[]= [
  { value: "30", label: "30" },
  { value: "35", label: "35" },
  { value: "40", label: "40" },
]
