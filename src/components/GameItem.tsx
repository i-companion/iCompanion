'use client';

import { Game } from '@prisma/client';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { deleteGame } from '@/lib/dbActions';

const removeItem = (id: number) => {
  // console.log(`Remove item with id: ${id}`);
  deleteGame(id);
};

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const GameItem = ({ name, id }: Game) => (
  <tr>
    <td>{name}</td>
    <td>
      <Link href={`edit/${id}`}>Edit</Link>
    </td>
    <td>
      <Button variant="danger" onClick={() => removeItem(id)}>
        <Trash />
      </Button>
    </td>
  </tr>
);

export default GameItem;
