const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admission = require('./models/Admission');

dotenv.config();

const seedData = [
  { firstName: "Alice", lastName: "Brown", email: "alice.brown@gmail.com", phone: "9999991111", dob: "2000-01-15", course: "Artificial Intelligence", education: "B.Sc. Computer Science", address: "123 Maple St, NYC", status: "Admitted", source: "Google" },
  { firstName: "Rahul", lastName: "Sharma", email: "rahul.sharma@yahoo.com", phone: "8888882222", dob: "1999-05-20", course: "Python Programming", education: "BCA", address: "456 Oak Ave, Mumbai", status: "Application", source: "LinkedIn" },
  { firstName: "Priya", lastName: "Patel", email: "priya.patel@outlook.com", phone: "7777773333", dob: "2001-08-10", course: "Web Development", education: "B.Com", address: "789 Pine Ln, Delhi", status: "Contacted", source: "Facebook" },
  { firstName: "John", lastName: "Doe", email: "john.doe@gmail.com", phone: "6666664444", dob: "1998-12-01", course: "Data Science & Analytics", education: "M.Sc. Statistics", address: "101 Elm St, London", status: "New", source: "Direct" },
  { firstName: "Sara", lastName: "Khan", email: "sara.khan@gmail.com", phone: "5555555555", dob: "2002-03-12", course: "Cybersecurity Essentials", education: "B.Tech IT", address: "202 Cedar Rd, Dubai", status: "Admitted", source: "Referral" },
  { firstName: "David", lastName: "Smith", email: "david.smith@hotmail.com", phone: "4444446666", dob: "1997-07-25", course: "UI/UX Design Mastery", education: "B.F.A.", address: "303 Birch Blvd, Sydney", status: "Application", source: "Google" },
  { firstName: "Ananya", lastName: "Reddy", email: "ananya.reddy@gmail.com", phone: "3333337777", dob: "2000-09-05", course: "Artificial Intelligence", education: "B.E. AI", address: "404 Spruce Dr, Bangalore", status: "Contacted", source: "Facebook" },
  { firstName: "Michael", lastName: "Johnson", email: "mike.j@gmail.com", phone: "2222228888", dob: "1996-11-11", course: "Web Development", education: "M.C.A.", address: "505 Willow Ln, Toronto", status: "New", source: "LinkedIn" },
  { firstName: "Sneha", lastName: "Desai", email: "sneha.desai@yahoo.com", phone: "1111119999", dob: "2001-02-28", course: "Python Programming", education: "B.Sc. IT", address: "606 Ash St, Pune", status: "Admitted", source: "Direct" },
  { firstName: "Carlos", lastName: "Garcia", email: "carlos.garcia@gmail.com", phone: "9876543210", dob: "1995-06-14", course: "Data Science & Analytics", education: "M.S. Data Science", address: "707 Palm Ave, Madrid", status: "Application", source: "Referral" },
  { firstName: "Maria", lastName: "Fernandez", email: "maria.fernandez@hotmail.com", phone: "9123456789", dob: "1999-10-30", course: "Cybersecurity Essentials", education: "B.Sc. Cyber", address: "808 Cedar St, Barcelona", status: "Contacted", source: "Google" },
  { firstName: "Amit", lastName: "Verma", email: "amit.verma@gmail.com", phone: "9988776655", dob: "2003-04-18", course: "UI/UX Design Mastery", education: "B.Des", address: "909 Maple Ave, Chandigarh", status: "New", source: "Facebook" },
  { firstName: "Emily", lastName: "Clark", email: "emily.clark@gmail.com", phone: "8877665544", dob: "1998-08-08", course: "Artificial Intelligence", education: "B.Sc. AI", address: "1001 Oak Dr, Chicago", status: "Admitted", source: "LinkedIn" },
  { firstName: "Rohit", lastName: "Singh", email: "rohit.singh@outlook.com", phone: "7766554433", dob: "2000-12-12", course: "Python Programming", education: "B.Tech CS", address: "1102 Pine Ln, Noida", status: "Application", source: "Direct" },
  { firstName: "Nina", lastName: "Patel", email: "nina.patel@gmail.com", phone: "6655443322", dob: "2002-01-01", course: "Web Development", education: "M.Sc. CS", address: "1203 Elm St, Ahmedabad", status: "Contacted", source: "Referral" },
  { firstName: "Kevin", lastName: "Anderson", email: "kevin.anderson@gmail.com", phone: "5544332211", dob: "1997-03-03", course: "Data Science & Analytics", education: "B.Com", address: "1304 Birch Rd, Boston", status: "New", source: "Google" },
  { firstName: "Pooja", lastName: "Kumari", email: "pooja.k@gmail.com", phone: "4433221100", dob: "2001-05-05", course: "Cybersecurity Essentials", education: "BCA", address: "1405 Ash Ln, Patna", status: "Admitted", source: "Facebook" },
  { firstName: "Daniel", lastName: "Martinez", email: "dan.martinez@yahoo.com", phone: "3322110099", dob: "1995-09-09", course: "UI/UX Design Mastery", education: "B.F.A.", address: "1506 Oak Ave, Mexico City", status: "Application", source: "LinkedIn" },
  { firstName: "Sofia", lastName: "Williams", email: "sofia.w@gmail.com", phone: "2211009988", dob: "1999-11-11", course: "Artificial Intelligence", education: "M.Tech AI", address: "1607 Maple Dr, Paris", status: "Contacted", source: "Direct" },
  { firstName: "Arjun", lastName: "Nair", email: "arjun.nair@outlook.com", phone: "1100998877", dob: "2002-07-07", course: "Python Programming", education: "B.Sc", address: "1708 Spruce St, Kochi", status: "New", source: "Referral" },
  { firstName: "Lisa", lastName: "Chen", email: "lisa.chen@gmail.com", phone: "9988771122", dob: "1996-06-06", course: "Web Development", education: "M.C.A.", address: "1809 Willow Ave, Singapore", status: "Admitted", source: "Google" },
  { firstName: "Gaurav", lastName: "Mehta", email: "gaurav.m@gmail.com", phone: "8877662233", dob: "2003-10-10", course: "Data Science & Analytics", education: "B.E.", address: "1910 Cedar Ln, Lucknow", status: "Application", source: "Facebook" },
  { firstName: "Mia", lastName: "Rodriguez", email: "mia.rodriguez@gmail.com", phone: "7766553344", dob: "1998-02-02", course: "Cybersecurity Essentials", education: "B.Tech", address: "2011 Birch Dr, Buenos Aires", status: "Contacted", source: "LinkedIn" },
  { firstName: "Raj", lastName: "Kumar", email: "raj.kumar@yahoo.com", phone: "6655444455", dob: "2001-08-08", course: "UI/UX Design Mastery", education: "B.Des", address: "2112 Oak St, Jaipur", status: "New", source: "Direct" },
  { firstName: "Elena", lastName: "Petrov", email: "elena.p@gmail.com", phone: "5544335566", dob: "1997-01-19", course: "Artificial Intelligence", education: "B.Sc. CS", address: "2213 Maple Ave, Moscow", status: "Admitted", source: "Referral" },
  { firstName: "Karan", lastName: "Jha", email: "karan.jha@outlook.com", phone: "4433226677", dob: "2000-12-25", course: "Python Programming", education: "BCA", address: "2314 Pine Ln, Ranchi", status: "Application", source: "Google" },
  { firstName: "Olivia", lastName: "Taylor", email: "olivia.taylor@gmail.com", phone: "3322117788", dob: "1999-03-15", course: "Web Development", education: "M.Sc.", address: "2415 Elm Dr, Sydney", status: "Contacted", source: "Facebook" },
  { firstName: "Aditya", lastName: "Shah", email: "aditya.shah@gmail.com", phone: "2211008899", dob: "2002-11-11", course: "Data Science & Analytics", education: "B.Com", address: "2516 Ash St, Surat", status: "New", source: "LinkedIn" },
  { firstName: "Charlotte", lastName: "Brown", email: "charlotte.b@gmail.com", phone: "1100999900", dob: "1996-04-22", course: "Cybersecurity Essentials", education: "B.Sc", address: "2617 Birch Ln, Berlin", status: "Admitted", source: "Direct" },
  { firstName: "Aryan", lastName: "Gupta", email: "aryan.gupta@yahoo.com", phone: "9988774455", dob: "2004-02-14", course: "UI/UX Design Mastery", education: "B.F.A.", address: "2718 Oak Dr, Indore", status: "Application", source: "Referral" },
  { firstName: "Isabella", lastName: "Moore", email: "isabella.moore@gmail.com", phone: "8877665544", dob: "1995-08-30", course: "Artificial Intelligence", education: "M.E.", address: "2819 Spruce Ave, Milan", status: "Contacted", source: "Google" },
  { firstName: "Manish", lastName: "Yadav", email: "manish.y@gmail.com", phone: "7766554433", dob: "2003-12-12", course: "Python Programming", education: "B.Tech", address: "2920 Willow Ln, Bhopal", status: "New", source: "Facebook" },
  { firstName: "Ava", lastName: "Wilson", email: "ava.wilson@outlook.com", phone: "6655443322", dob: "1999-06-18", course: "Web Development", education: "BCA", address: "3031 Cedar Blvd, Toronto", status: "Admitted", source: "LinkedIn" },
  { firstName: "Vikram", lastName: "Rathore", email: "vikram.r@gmail.com", phone: "5544332211", dob: "2001-09-09", course: "Data Science & Analytics", education: "B.Sc", address: "3142 Maple St, Jodhpur", status: "Application", source: "Direct" },
  { firstName: "Grace", lastName: "Lee", email: "grace.lee@gmail.com", phone: "4433221100", dob: "1997-07-07", course: "Cybersecurity Essentials", education: "M.Sc", address: "3253 Ash Dr, Seoul", status: "Contacted", source: "Referral" },
  { firstName: "Akash", lastName: "Singh", email: "akash.singh@yahoo.com", phone: "3322110099", dob: "2000-05-05", course: "UI/UX Design Mastery", education: "B.Des", address: "3364 Pine Ln, Agra", status: "New", source: "Google" },
  { firstName: "Sophia", lastName: "King", email: "sophia.king@gmail.com", phone: "2211009988", dob: "1998-10-10", course: "Artificial Intelligence", education: "B.Tech", address: "3475 Elm Ave, Los Angeles", status: "Admitted", source: "Facebook" },
  { firstName: "Ramesh", lastName: "Kumar", email: "ramesh.k@gmail.com", phone: "1100998877", dob: "1995-01-15", course: "Python Programming", education: "M.C.A.", address: "3586 Oak St, Chennai", status: "Application", source: "LinkedIn" },
  { firstName: "Emma", lastName: "Davis", email: "emma.davis@outlook.com", phone: "9988772233", dob: "2003-03-03", course: "Web Development", education: "B.Sc", address: "3697 Maple Dr, Melbourne", status: "Contacted", source: "Direct" },
  { firstName: "Vivek", lastName: "Sethi", email: "vivek.sethi@gmail.com", phone: "8877663344", dob: "2001-12-20", course: "Data Science & Analytics", education: "B.E.", address: "3708 Birch Ln, Chandigarh", status: "New", source: "Referral" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');
    await Admission.deleteMany();
    await Admission.insertMany(seedData);
    console.log('✅ 40+ mock leads seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();