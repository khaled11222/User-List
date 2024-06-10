import { connect } from "react-redux"
import { FetchUserList, RemoveUser } from "../Redux/Action"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const Userlisting = ({ loaduser, removeuser, user }) => {
  useEffect(() => {
    loaduser();
  },[loaduser])

  const handleDelete = (code) => {
    if(window.confirm('Do you want to remove?')){
      removeuser(code);
      loaduser();
      toast.success('User removed successfully.')
    }
  }

  return (
    user.loading?<div><h2>loading...</h2></div>:
    user.errmessage?<div><h2>{user.errmessage}</h2></div>:
    <div>
      <div className="card">
        <div className="card-header"> 
          <Link to={'/user/add'} className="btn btn-success">Add User [+]</Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: '#343a40', color: '#ffffff' }}>
              <tr>
                <td>Code</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Role</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                user.userlist && user.userlist.map(item => 
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      <Link to={'/user/edit/'+item.id} className="btn btn-primary">Edit</Link> |
                      <button onClick={() => {handleDelete(item.id)}} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state)=> {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    loaduser: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(RemoveUser(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Userlisting)
