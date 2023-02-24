import { useState, useEffect } from "react";
function App() {
    const [students, setStudents] = useState(() => {
        // retrieve any existing student data from the localStorage
        const data = localStorage.getItem('students');
        return data ? JSON.parse(data) : [];
    });

    useEffect(() => {
        console.log(students);
        if(students.length > 0){
                localStorage.setItem('students', JSON.stringify(students));
        }
    }, [students]);
    // To clear students for a new attendance next day
    const [isCleared, setIsCleared] = useState(false);

    function handleClearStudents() {
        setStudents([]);
        setIsCleared(true);
    }

    useEffect(() => {
        if (isCleared) {
            setIsCleared(false);
        } else {

            localStorage.setItem('students', JSON.stringify(students));

        }
    }, [isCleared]);
    const [rollNumber, setRollNumber] = useState("");
    const [studentName, setStudentName] = useState("");


    const addStudent = () => {
        
        const isDuplicateRollNo = students.some((student) => student.rollNumber === rollNumber);
        if (isDuplicateRollNo) {
            alert('Roll number already exists!');
            return;
          }
        
        const newStudent = {
            rollNumber: rollNumber,
            studentName: studentName,
            checkInTime: null,
            checkOutTime: null,
        };
        console.log("new : " , newStudent);
        if(newStudent.rollNumber.length > 0 && newStudent.studentName.length > 0 ){
        setStudents([...students, newStudent]);
        setRollNumber("");
        setStudentName("");
        }else{
            alert("Enter data:")
        }
    };

    const checkInStudent = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].checkInTime = new Date().toLocaleTimeString();
        setStudents(updatedStudents);
    };

    const checkOutStudent = (index) => {
        const updatedStudents = [...students];
        updatedStudents[index].checkOutTime = new Date().toLocaleTimeString();
        setStudents(updatedStudents);
    };

    
    const numStudentsInSchool = students.filter(
        (student) => student.checkInTime && !student.checkOutTime
    ).length;

    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Student Attendance System</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="rollNumber"
                        >
                            Roll Number
                        </label>
                        <input
                        required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="rollNumber"
                            type="text"
                            placeholder="Enter roll number"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="studentName"
                        >
                            Student Name
                        </label>
                        <input
                        required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="studentName"
                            type="text"
                            placeholder="Enter student name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                           
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={addStudent}
                        >
                            Add Student
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleClearStudents}>
                            Clear Students
                        </button>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4">

                    <p className="text-gray-800 font-bold mb-4">
                        {numStudentsInSchool}/{students.length} students currently in school
                    </p>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    {students.map((student, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 rounded-md p-4 mb-4 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-gray-800 font-bold">
                                    {index + 1}. {student.studentName}
                                </p>
                                <p className="text-gray-500">
                                    Roll Number: {student.rollNumber}
                                </p><div className="text-gray-500">
                                    {student.checkInTime
                                        ? `Checked In: ${student.checkInTime}`
                                        : "Not Checked In Yet"}
                                </div>
                                <div className="text-gray-500">
                                    {student.checkOutTime
                                        ? `Checked Out: ${student.checkOutTime}`
                                        : "Not Checked Out Yet"}
                                </div>
                            </div>
                            <div className="flex items-center">
                                {!student.checkInTime && (
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => checkInStudent(index)}
                                    >
                                        Check In
                                    </button>
                                )}
                                {student.checkInTime && !student.checkOutTime && (
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                                        onClick={() => checkOutStudent(index)}
                                    >
                                        Check Out
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
export default App;
