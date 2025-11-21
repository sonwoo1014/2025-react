import React, {useState, useEffect} from 'react';
export default function ShowList (){
    const API_URL = "http://6915405584e8bd126af93985.mockapi.io/students";
    
    const [students, setStudents] = useState([]);
    const [editItem, setEditItem] = useState(null);

    const [form, setForm] = useState ({
        name: "",
        major: "",
        score: "",
        year: "",
    });

// 학생 목록 불러오기
  const loadData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      alert("데이터를 불러오는 중 오류 발생");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", major: "", score: "", year: "" });
    setEditItem(null);
  };

  // 학생 추가
  const addStudent = async () => {
    if (!form.name || !form.major || !form.score || !form.year) {
      alert("모든 값을 입력하세요.");
      return;
    }

    const body = {
      name: form.name,
      major: form.major,
      score: Number(form.score),
      year: Number(form.year),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        alert("추가 실패");
        return;
      }

      resetForm();
      loadData();
      document.getElementById("addModalClose").click(); // 모달 닫기

    } catch (err) {
      console.error(err);
      alert("추가 중 오류 발생");
    }
  };

  // 수정 모달 열기
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name,
      major: item.major,
      score: String(item.score),
      year: String(item.year),
    });
  };

  // 학생 수정
  const updateStudent = async () => {
    if (!editItem) return;

    const body = {
      name: form.name,
      major: form.major,
      score: Number(form.score),
      year: Number(form.year),
    };

    try {
      const res = await fetch(`${API_URL}/${editItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        alert("수정 실패");
        return;
      }

      resetForm();
      loadData();
      document.getElementById("editModalClose").click(); // 모달 닫기

    } catch (err) {
      console.error(err);
      alert("수정 중 오류 발생");
    }
  };

  // 삭제
  const deleteStudent = async (id) => {
    if (!window.confirm("삭제 하시겠습니까?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) {
        alert("삭제 실패");
        return;
      }

      loadData();
    } catch (err) {
      console.error(err);
      alert("삭제 중 오류 발생");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">학생 정보 관리</h2>

      {/* 추가 버튼 */}
      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
        onClick={resetForm}
      >
        학생 추가
      </button>

      {/* 테이블 */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>전공</th>
            <th>점수</th>
            <th>학년</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.major}</td>
              <td>{stu.score}</td>
              <td>{stu.year}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => openEdit(stu)}
                >
                  수정
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => deleteStudent(stu.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 추가 모달 */}
      <div className="modal fade" id="addModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">학생 추가</h5>
              <button
                id="addModalClose"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="이름"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="전공"
                value={form.major}
                onChange={(e) => updateField("major", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="점수"
                type="number"
                value={form.score}
                onChange={(e) => updateField("score", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="학년"
                type="number"
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={addStudent}>
                추가하기
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 수정 모달 */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">학생 수정</h5>
              <button
                id="editModalClose"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="이름"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="전공"
                value={form.major}
                onChange={(e) => updateField("major", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="점수"
                type="number"
                value={form.score}
                onChange={(e) => updateField("score", e.target.value)}
              />
              <input
                className="form-control mb-2"
                placeholder="학년"
                type="number"
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={updateStudent}>
                수정하기
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );

}