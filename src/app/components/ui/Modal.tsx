import { PropsWithChildren, ReactNode } from 'react';
import { Content, Overlay, Root, Portal } from '@radix-ui/react-dialog';
import { Button } from '.';

type Props = {
  children: ReactNode;
  visible: boolean;
  onVisibilityChange: (visibility: boolean) => void;
};

export function Modal({ children, visible, onVisibilityChange }: Props) {
  return (
    <Root open={visible} onOpenChange={onVisibilityChange}>
      <Portal container={document.body}>
        <Overlay className="modal__overlay" />
        <Content className="modal">
          <div className="modal__content">{children}</div>
        </Content>
      </Portal>
    </Root>
  );
}

type ConifrmModalPorps = {
  title?: string;
  successLabel?: string;
  cancelLabel?: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onVisibilitChange?: (visible: boolean) => void;
};

export function ConfirmModal({
  title,
  successLabel,
  cancelLabel,
  visible,
  onConfirm,
  onCancel,
  children,
  onVisibilitChange
}: PropsWithChildren<ConifrmModalPorps>) {
  const visibilityChangeDefault = () => {
    return;
  };
  return (
    <Modal visible={visible} onVisibilityChange={onVisibilitChange ?? visibilityChangeDefault}>
      <div className="stack-text">
        <div className="text-center stack-text">
          <h3>{title ?? 'Etes vous sure de vouloir faire cette action ?'}</h3>
          {children}
        </div>

        <footer className="flex-inline flex-inline--center">
          <Button onClick={onCancel} btnType="default">
            {cancelLabel ?? 'Non'}
          </Button>
          <Button onClick={onConfirm} btnType="secondary">
            {successLabel ?? 'Oui'}
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
