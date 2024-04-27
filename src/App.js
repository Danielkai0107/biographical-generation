import { useState } from "react";
import "./App.css";

import { GoogleGenerativeAI } from "@google/generative-ai";
function App() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [edu, setEdu] = useState("");
  const [job, setJob] = useState("");
  const [exp, setExp] = useState("");
  const [num, setNum] = useState("");
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDiJ7vRnQBad-_qkT-ElT337Vmy0h9vESo"
  );
  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `姓名 ${name}、年齡 ${age}、學歷 ${edu}、經歷 ${exp}、居住地 ${country}、興趣 ${hobbies}，幫我生成${num}字${type}自傳文章，不要標題`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setApiData(text);
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name, type, age, country, hobbies);
    fetchData();
  };
  return (
    <div className="container">
      <h1 className="mt-5">自傳產生器</h1>
      <div className="mt-5 mb-5">
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-end gap-4">
            <div className="col-lg-2">
              <label htmlFor="name" className="form-label">
                姓名
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <label htmlFor="age" className="form-label">
                年齡
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <label htmlFor="country" className="form-label">
                居住地
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <label htmlFor="hobbies" className="form-label">
                興趣
              </label>
              <input
                type="text"
                className="form-control"
                id="hobbies"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <label htmlFor="edu" className="form-label">
                學歷
              </label>
              <input
                type="text"
                className="form-control"
                id="edu"
                value={edu}
                onChange={(e) => setEdu(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <label htmlFor="job" className="form-label">
                應徵職位
              </label>
              <input
                type="text"
                className="form-control"
                id="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>

            <div className="col-lg-2">
              <label htmlFor="exp" className="form-label">
                經歷
              </label>
              <input
                type="text"
                className="form-control"
                id="exp"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
              />
            </div>
          </div>
          <div className="row d-flex align-items-end gap-4 mt-3">
            <div className="col-lg-2">
              <label htmlFor="type" className="form-label">
                履歷型態
              </label>
              <select
                className="form-select"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="求學">求學</option>
                <option value="求職">求職</option>
                <option value="生活">生活</option>
              </select>
            </div>
            <div className="col-lg-2">
              <label htmlFor="num" className="form-label">
                字數
              </label>
              <input
                type="text"
                className="form-control"
                id="num"
                value={num}
                onChange={(e) => setNum(e.target.value)}
              />
            </div>
            <div className="col-lg-2">
              <button type="submit" className="btn btn-primary mt-3 col-lg-12">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="">
        {!loading && <p className="text-align-left">{apiData}</p>}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
export default App;
