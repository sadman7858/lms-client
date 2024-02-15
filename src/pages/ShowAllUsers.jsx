import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import style from './addadmin.module.css';
import UserDltModal from './UserDltModal';
function ShowAllUsers() {
  const [users, setUsers] = useState([]);
  const [ordView, setOrdView] = useState(-1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/auth/allusers');
        if (response.data.status) {
          setUsers(response.data.data);
        } else {
          toast.error('🦄 Error fetching users list!', {
            position: 'top-center',
            draggable: true,
            theme: 'colored',
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('🦄 An error occurred while fetching users!', {
          position: 'top-center',
          draggable: true,
          theme: 'colored',
        });
      }
    };

    fetchData();
  }, [ordView]);
  const handleState = (val, usr) => {
    const upstate = { ...usr, status: val };
    axios
      .put(`http://localhost:4000/auth/updateUsrStatus/${usr.id}`, {
        upstate,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(' Update Successfully!', {
            position: 'top-center',
          });
          setOrdView(-1);
        } else {
          toast.error(' Update not work!', {
            position: 'top-center',
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // setSelectedVal(e.target.us);
    // alert(e.target.value);
    // //  setOrdView(-1);
  };
  const handleOrderView = (id) => {
    setOrdView(id);
  };
  return (
    <div className={`${style.usersbg}`}>
      <div className={`${style.customTable}`}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Profile Pic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((usr, i) => (
              <tr>
                <td>{usr.name}</td>
                <td>{usr.email}</td>
                <td>{usr.role}</td>
                <td>
                  <UserDltModal user={usr} />
                </td>
                <td>
                  {usr.id === ordView ? (
                    <select
                      name=''
                      defaultValue=''
                      id=''
                      onChange={(e) => handleState(e.target.value, usr)}
                    >
                      <option value='' disabled>
                        Change status
                      </option>
                      <option value='block'>block</option>
                      <option value='active'>active</option>
                    </select>
                  ) : (
                    <span>{usr.status}</span>
                  )}
                  <div
                    className={style.cursorPointer}
                    onClick={(e) => handleOrderView(usr.id)}
                  >
                    <i class='bi bi-eyedropper'></i>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </div>
    </div>
  );
}

export default ShowAllUsers;
