import { useHistory } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import logoImgLight from '../assets/images/logoLight.svg';
import { RoomContainer } from '../styles/RoomStyles';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggler';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import RoomItem from '../components/RoomItem';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

type FirebaseQuestions = Record<
  string,
  {
    title: string;
    endedAt: string | null;
}
>;

type RoomType = {
  id: string;
  title: string;
  endedAt: string | null;
};

export function MyRooms() {
  const history = useHistory();
  const [rooms, setRooms] = useState<RoomType[]>()
  const { user} = useAuth();
  const [loading, setLoading] = useState(true)

  const { currentTheme } = useTheme();
  
  useEffect(() => {
    try {
      if(user?.id) {
        database.ref('/rooms').orderByChild("authorId").equalTo(user?.id).on('value', function (snapshot) {
          const databaseRooms = snapshot.val();
          const firebaseQuestions: FirebaseQuestions = databaseRooms ?? {};
  
          const parsedQuestions = Object.entries(firebaseQuestions).map(
            ([key, value]) => ({
              id: key,
              title: value.title,
              endedAt: value.endedAt
            })
          );
  
          setRooms(parsedQuestions.reverse());
        });
      }
    } catch {
      toast.error("Ocorreu um erro ao carregar suas salas");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  return (
    <RoomContainer>
      <header>
        <div className="content">
          {currentTheme === 'dark' ? <img src={logoImgLight} alt="Letmeask" onClick={() => history.push("/")}/> : <img src={logoImg} alt="Letmeask" onClick={() => history.push("/")}/>}
          <ThemeToggle />
        </div>
      </header>

      <main className="content">
        <h3>Suas salas</h3>
        {loading ? <Spinner /> : 
          rooms?.reverse().map(room => (
            <RoomItem key={room.id} room={room}/>
          ))
        }
        {!loading && rooms?.length <= 0 && <p>Você não possui nenhuma sala até o momento.</p>}
      </main>
    </RoomContainer>
  );
}
