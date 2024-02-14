import { FC, ReactElement } from "react";
import { ICreateTaskMenuItemProps } from "./types";
import { Stack, Icon, Text } from "@chakra-ui/react";


export const CreateTaskMenuItem: FC<ICreateTaskMenuItemProps> = ({
   icon,
   title,
   dayShortName,
   variant,
   handlerMenuItem,
}): ReactElement => {
   return (
      <Stack direction={'row'} justify={'space-between'}
         cursor={'pointer'} 
         p={2}
         borderColor={'blue.500'}
         border={'3px solid transparent'}
         _hover={{ borderColor: 'blue.500' }}
         onClick={() => handlerMenuItem(variant)}
      >
         <Stack direction={'row'} align={'center'} pointerEvents={'none'}>
            <Icon as={icon} boxSize={6} pointerEvents={'none'} />
            <Text pointerEvents={'none'}>{title}</Text>
         </Stack>
         <Text textColor={'gray'} pointerEvents={'none'}>{dayShortName}</Text>
      </Stack>
   )
}