'use client';

import { Button, Flex, Heading, Icon, Text, View } from '@aws-amplify/ui-react';
import AddDiaryDialogButton from './AddDiaryDialogButton';
import Navbar from './Navbar';

function Dashboard({ signOut }: { signOut: () => void }) {
  return (
    <main>
      <Navbar signOut={signOut} />
    </main>
  );
}

export default Dashboard;
