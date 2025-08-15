import { atom, useAtom } from "jotai";

import { Role, User } from "../common/user";

type UserEditDialogAtom =
  | {
      isOpen: true;
      user: User;
    }
  | {
      isOpen: false;
      user: null;
    };
export const userEditDialogAtom = atom<UserEditDialogAtom>({
  isOpen: false,
  user: null,
});

type UseUserEditDialogReturn =
  | {
      isOpen: true;
      user: User;
      closeDialog(): void;
    }
  | {
      isOpen: false;
      user: null;
      openDialog(user: User): void;
    };
export function useUserEditDialog(): UseUserEditDialogReturn {
  const [state, setState] = useAtom(userEditDialogAtom);

  function openDialog(user: {
    userId: string;
    name: string;
    email: string;
    role: Role;
  }) {
    setState({
      isOpen: true,
      user,
    });
  }

  function closeDialog() {
    setState({
      isOpen: false,
      user: null,
    });
  }

  if (state.isOpen === true) {
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
