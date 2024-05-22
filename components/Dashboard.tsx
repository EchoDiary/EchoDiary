'use client';

import { Button, Flex, Heading, Icon, Text, View } from '@aws-amplify/ui-react';
import AddDiaryDialogButton from './AddDiaryDialogButton';

function Dashboard({ signOut }: { signOut: () => void }) {
  return (
    <View color='#bdc3d2' backgroundColor='#000000' padding='1em 2em'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading level={3}>EchoDiary</Heading>
        <Flex gap='2em'>
          <AddDiaryDialogButton />
          <Button
            padding='.2em 1em'
            backgroundColor='transparent'
            onClick={() => {
              signOut();
            }}
          >
            <Text fontSize='1.2rem' color='#bdc3d2'>
              Logout
            </Text>
          </Button>
        </Flex>
      </Flex>
    </View>
  );
}

export default Dashboard;
