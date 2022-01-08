import { BigNumberish } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { createAction } from 'typesafe-actions';

export const setSayHelloMessage = createAction('ui/SAY_HELLO_set', resolve => {
    return (sayHello: string) => resolve(sayHello);
});




