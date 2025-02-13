import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetUserObj, UpdateUser } from "../Redux/Action";

const Updateuser = () => {
  const [id, idChange] = useState(0);
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [role, roleChange] = useState("staff");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {code} = useParams();
  const userobj = useSelector((state) => state.user.userobj)

  const handleSubmit = (e) => {
    e.preventDefault();
    const userobj = { id, name, email, phone, role };
    dispatch(UpdateUser(userobj, id));
    navigate('/user');
  };

  useEffect(() => {
    dispatch(GetUserObj(code))
  },[])

  useEffect(() => {
    if(userobj){
      idChange(userobj.id);
      nameChange(userobj.name);
      emailChange(userobj.email);
      phoneChange(userobj.phone);
      roleChange(userobj.role);
    }
  },[userobj])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "left" }}>
            <h2>Update User</h2>
          </div>
          <div className="card-body" style={{ textAlign: "left" }}>
            <div className="row">
            <div className="col-lg-12">
                <div className="form-group">
                  <label>Id</label>
                  <input
                    value={id || ''}
                    disabled="disabled"
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={name || ''}
                    onChange={(e) => nameChange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email || ''}
                    onChange={(e) => emailChange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    value={phone || ''}
                    onChange={(e) => phoneChange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={role || ''}
                    onChange={(e) => roleChange(e.target.value)}
                    className="form-control"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ textAlign: "left" }}>
            <button className="btn btn-primary" type="submit">Submit</button>|
            <Link className="btn btn-danger" to={"/user"}>
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Updateuser
