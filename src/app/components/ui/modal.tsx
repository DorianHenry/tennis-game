import { ReactNode } from 'react';
import { Content, Overlay, Root, Portal } from '@radix-ui/react-dialog';

type ModalProps = {
  children: ReactNode;
  visible: boolean;
  onVisibilityChange: (visibility: boolean) => void;
};

export function Modal({ children, visible, onVisibilityChange }: ModalProps) {
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
