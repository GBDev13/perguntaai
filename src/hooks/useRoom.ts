import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`);
    setLoading(true);
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => ({
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, like]) => like.authorId === user?.id
          )?.[0]
        })
      );
      setIsEnded(!!databaseRoom.endedAt)
      setOwner(databaseRoom.authorId);
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      setLoading(false);
  });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, user?.id]);

  return { questions, title, owner, loading, isEnded };
}
