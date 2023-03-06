import React from 'react';
import {
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
  AlertDialogOverlay, Box, Button,
  useToast, useDisclosure, ThemingProps, ThemeTypings } from '@chakra-ui/react';

interface Props extends React.PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  title: string
  text: string
  acceptButtonText: string 
  cancelButtonText?: string
  acceptButtonColorScheme?: ThemeTypings["colorSchemes"],
  cancelButtonColorScheme?: ThemeTypings["colorSchemes"],
  onCancel?: () => any,
  onAccept: () => any,
}

const Dialog: React.FC<Props>  = ({ 
  isOpen, 
  onClose, 
  title, 
  text, 
  acceptButtonText, 
  cancelButtonText,
  acceptButtonColorScheme,
  cancelButtonColorScheme,
  onCancel,
  onAccept,
}) => {
  const cancelRef = React.useRef(null)

  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {text}
            </AlertDialogBody>

            <AlertDialogFooter>
              {!!cancelButtonText && 
                <Button colorScheme={cancelButtonColorScheme} ref={cancelRef} onClick={onCancel || onClose}>
                  {cancelButtonText}
                </Button>
              }
              <Button colorScheme={acceptButtonColorScheme} onClick={onAccept} ml={3}>
                {acceptButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  );
};

export default Dialog;