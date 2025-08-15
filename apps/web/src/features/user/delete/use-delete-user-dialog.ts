import { atom, useAtom } from "jotai";

import { User } from "../common/user";

type DeleteUser = Omit<User, "role">;

type DeleteUserDialogAtom =
  | {
      isOpen: false;
      user: null;
    }
  | {
      isOpen: true;
      user: DeleteUser;
    };

export const deleteUserDialogAtom = atom<DeleteUserDialogAtom>({
  isOpen: false,
  user: null,
});

type UseDeleteUserDialogReturn =
  | {
      isOpen: false;
      user: null;
      openDialog(user: DeleteUser): void;
    }
  | {
      isOpen: true;
      user: DeleteUser;
      closeDialog(): void;
    };
export function useDeleteUserDialog(): UseDeleteUserDialogReturn {
  const [state, setState] = useAtom(deleteUserDialogAtom);

  const openDialog = (user: {
    userId: string;
    name: string;
    email: string;
  }) => {
    setState({
      isOpen: true,
      user,
    });
  };

  function closeDialog() {
    setState({
      isOpen: false,
      user: null,
    });
  }

  if (state.isOpen) {
    return {
      isOpen: true,
      user: state.user,
      closeDialog,
    };
  }

  return {
    isOpen: false,
    user: null,
    openDialog,
  };
}
