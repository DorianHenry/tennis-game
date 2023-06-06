import {
  ComponentProps,
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
  useState
} from 'react';
import { ConfirmModal } from '../ui';

export type ConfirmParams = Partial<
  Omit<ComponentProps<typeof ConfirmModal>, 'visible' | 'onConfirm' | 'onCancel'>
>;

//In the absence of context, we return true directly
const defaultFunction = (_p?: ConfirmParams) => Promise.resolve(true);

const defaultValue = {
  confirmRef: {
    current: defaultFunction
  }
};

export const ConfirmContext = createContext(defaultValue);

// We will have to surround our application with this context provide
export function ConfirmContextProvider({ children }: PropsWithChildren) {
  const confirmRef = useRef(defaultFunction);
  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      {children}
      <ConfirmModalWithContext />
    </ConfirmContext.Provider>
  );
}
export function ConfirmModalWithContext() {
  const [visible, setVisible] = useState(false);
  const [props, setProps] = useState<undefined | ConfirmParams>();
  const resolveRef = useRef((_v: boolean) => {
    return;
  });
  const { confirmRef } = useContext(ConfirmContext);
  confirmRef.current = (props) =>
    new Promise((resolve) => {
      setProps(props);
      setVisible(true);
      resolveRef.current = resolve;
    });

  const onConfirm = () => {
    resolveRef.current(true);
    setVisible(false);
  };

  const onCancel = () => {
    resolveRef.current(false);
    setVisible(false);
  };
  return <ConfirmModal onConfirm={onConfirm} onCancel={onCancel} visible={visible} {...props} />;
}
