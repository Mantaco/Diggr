/* eslint-disable */

import { react, useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import './profile.css';
import axios from 'axios';
import ProfileCard from '../Discover/ProfileCard.jsx';
import CreatePackCard from './createPack.jsx'
import useUserContext from '../../hooks/useUserContext';

const FriendsList = ( { currentUser }) => {
  // const [friends, setFriends] = useState([]);
  const [friendsData, setFriendsData] = useState([])
  const [gotFriends, setGotFriends] = useState(false)
  const [gotPacks, setGotPacks] = useState(false)

  const { /*userId,*/ packs, userData, friends, setFriends, photos } = useUserContext();

  const userId = 1
  useEffect(() => {
    if (!gotFriends) {
      axios.get(`http://localhost:3001/getFriends?userId=${userId}`)
      .then((results) => {
      //  console.log('results son', results.data)
       let friendos = results.data;
       let friendsArray = [];
       friendos.forEach(friend => {
        //  friendsArray.push(friend.dog_name)
         friend.photos = ['https://i.imgflip.com/3nzkub.png?a465864', 'https://i.imgflip.com/3nzkub.png?a465864'];
       })
       setFriends(friendsArray);
       setFriendsData(friendos)
       setGotFriends(true)
      })
      .catch((err) => {
       console.log('err', err);
      })
    }
  }, []);

  // useEffect(() => {
  //   if (!gotPacks) {
  //     axios.get('http://localhost:3001/getPacks')
  //     .then((results) => {
  //      console.log('packs son', results.data.rows)
  //       setPacks(results.data.rows);
  //       setGotPacks(true);
  //       console.log('friendsdata', friendsData);
  //     })
  //     .catch((err) => {
  //      console.log('err', err);
  //     })
  //   }
  //  });

   const addToPack = (packId, userId) => {
    // console.log('packId', packId, userId)
    axios.put('http://localhost:3001/addtopack', {
      params: {
        packId: packId,
        userId: userId
      }
    })
    .then(() => {
      console.log('added to pack')
    })
    .catch(() => {
      alert('That user is already a part of that pack')
      // console.log('err in adding to pack')
    })
   }


  //for testing modal

  return (

  <div className="flex overflow-x-auto w-[470px] h-48 overflow-y-auto scroll-smooth place-self-start mt-[500px] ml-16">
  <table className="table w-[470px]">
    {/* head */}
    <thead>
      <tr>
        <th>Friends List</th>
      </tr>
    </thead>
    <tbody>
    {/* <div className='text-xs'>{sampleFriendsList.map((item, index)=> { */}
    <div className='text-xs'>{friends.map((item, index)=> {
      let hrefString = `#my-modal-${index}`
      let hrefString2 = `#my-modal-${index + 10}`
      let user = friendsData[index];
      return (
      <div>      <tr className="hover flex">
      <th className='self-center'>{index + 1}</th>
      {/* <td className='w-40 self-center'>{item}</td> */}

      <label htmlFor={hrefString} className="btn w-40 self-center">{item}</label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id={hrefString} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor={hrefString} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            {/* <ProfileCard user={friendsData[index]}/> */}
            {/* <ProfileCard user={user}/> */}

        </div>
      </div>

      <td>
        {/* <a className="btn btn-outline btn-primary w-24 rounded-full mr-6 text-xs self-center">Add To Pack</a> */}
      <div className="dropdown">
  <label tabIndex={0} className="btn m-1">Add To Pack</label>
  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    {packs.map(pack => {
      let userId = user.user_id;
      return  <li onClick={() => {addToPack(pack.pack_id, userId)}}><a>{pack.name}</a></li>
    })}
    {/* <li><a>Item 1</a></li>
    <li><a>Item 2</a></li> */}
  </ul>
  </div>
      {/* <div className="btn btn-outline btn-primary w-24 rounded-full mr-6 text-xs">Create Pack</div> */}
      <label htmlFor={hrefString2} className="btn">Create Pack</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id={hrefString2} className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor={hrefString2} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <CreatePackCard currentUser={currentUser} friend={user}/>
  </div>
</div>
  </td>
    </tr></div>
      )}
  )}
  </div>
    </tbody>
  </table>
</div>
  )
}

export default FriendsList;