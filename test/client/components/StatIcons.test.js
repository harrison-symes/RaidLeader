import React from 'react'
import {shallow, mount} from 'enzyme'

import {DeadRecruitIcon, PlayerIcon, HealthIcon, SpeedIcon, PowerIcon, ManaIcon, ManaRegenIcon, CastTimeIcon, CoolDownIcon, GoldIcon, ArmorIcon, ClassIcon, TargetTypeIcon, LevelIcon, SpellCountIcon, RecruitCountIcon, WeaponAvailableIcon, WeaponIcon, SpellElementIcon, SpellIcon, ZodiacIcon, QuantityIcon, WeaponEquippedByIcon} from '../../../client/components/icons/StatIcons'

jest.mock('react-tippy', () => ({
  Tooltip: ({html, children}) => <div>
    {html}
    {children}
  </div>
}))

jest.mock('../../../client/utils/classText', () => ({
  classIcons: (heroClass) => 'class-icon-' + heroClass,
  attackIcons: () => ({colour: 'black'})
}))

jest.mock('../../../client/utils/weaponSwitch', () => ({
  ['Fake Weapon']: () => ({
    class: 'Fake Class',
    icon: 'fake-icon'
  })
}))

jest.mock('../../../client/utils/zodiacs', () => ({
  getZodiacData: () => ({
    health: 0.1,
    power: 0.1,
    speed: 0.1,
    icon: 'fake-icon'
  })
}))

test('DeadRecruitIcon', () => {
  const wrapper =  mount(<DeadRecruitIcon name="Jeff" />)

  expect(wrapper.find('p').text()).toBe('Jeff has Died')
  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-tombstone')).toBeTruthy()
})

test('PlayerIcon', () => {
  const wrapper =  mount(<PlayerIcon name="Jeff" />)

  expect(wrapper.find('p').text()).toBe('Jeff')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-player-king')).toBeTruthy()
})

test('HealthIcon', () => {
  const wrapper =  mount(<HealthIcon value={100} />)

  expect(wrapper.find('p').text()).toBe('100 Health')

  expect(wrapper.find('span').text()).toBe('100')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-two-hearts')).toBeTruthy()
})

test('SpeedIcon', () => {
  const wrapper =  mount(<SpeedIcon value={100} />)

  expect(wrapper.find('p').text()).toBe('100 Speed')

  expect(wrapper.find('span').text()).toBe('100')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-lightning-bolt')).toBeTruthy()
})

test('PowerIcon', () => {
  const wrapper =  mount(<PowerIcon value={100} />)

  expect(wrapper.find('p').text()).toBe('100 Power')

  expect(wrapper.find('span').text()).toBe('100')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-axe-swing')).toBeTruthy()
})

test('CastTimeIcon', () => {
  const wrapper =  mount(<CastTimeIcon value={'10s'} />)

  expect(wrapper.find('p').text()).toBe('10s Cast Time')

  expect(wrapper.find('span').text()).toBe('10s')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-stopwatch')).toBeTruthy()
})

test('CoolDownIcon', () => {
  const wrapper =  mount(<CoolDownIcon value={'10s'} />)

  expect(wrapper.find('p').text()).toBe('10s Cool Down')

  expect(wrapper.find('span').text()).toBe('10s')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-hourglass')).toBeTruthy()
})

test('ManaIcon', () => {
  const wrapper =  mount(<ManaIcon value={10} />)

  expect(wrapper.find('p').text()).toBe('10 Mana')

  expect(wrapper.find('span').text()).toBe('10')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-crystals')).toBeTruthy()
})

test('ManaRegenIcon', () => {
  const wrapper =  mount(<ManaRegenIcon value={10} />)

  expect(wrapper.find('p').text()).toBe('10 Mana Per Second')

  expect(wrapper.find('span').text()).toBe('10')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-cycle')).toBeTruthy()
})

test('GoldIcon', () => {
  const wrapper =  mount(<GoldIcon value={10} />)

  expect(wrapper.find('p').text()).toBe('10 Gold')

  expect(wrapper.find('span').text()).toBe('10')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-gold-bar')).toBeTruthy()
})

test('ArmorIcon', () => {
  const wrapper =  mount(<ArmorIcon value={10} />)

  expect(wrapper.find('p').text()).toBe('10 Armor')

  expect(wrapper.find('span').text()).toBe('10')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-heavy-shield')).toBeTruthy()
})

test('ArmorIcon', () => {
  const wrapper =  mount(<ArmorIcon value={10} />)

  expect(wrapper.find('p').text()).toBe('10 Armor')

  expect(wrapper.find('span').text()).toBe('10')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-heavy-shield')).toBeTruthy()
})

test('classIcons', () => {
  const classes = [
    'Paladin',
    'Warrior',
    'Rogue',
    'Monk',
    'Hunter',
    'Warlock',
    'Priest',
    'Shaman',
    'Mage'
  ]

  classes.forEach((heroClass, i) => {
    const wrapper =  mount(<ClassIcon heroClass={heroClass} id={i} />)

    expect(wrapper.find('p').text()).toBe('Class: ' + heroClass)

    expect(wrapper.find('span').text()).toBe('')

    expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
    expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
    expect(wrapper.find('i').hasClass('class-icon-' + heroClass)).toBeTruthy()
  })
})

test('TargetTypeIcon (single)', () => {
  const wrapper =  mount(<TargetTypeIcon singleTarget={true} />)

  expect(wrapper.find('p').text()).toBe('Requires Friendly Target')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-targeted')).toBeTruthy()
})

test('TargetTypeIcon (no target)', () => {
  const wrapper =  mount(<TargetTypeIcon singleTarget={false} />)

  expect(wrapper.find('p').text()).toBe('No Target Needed')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-radial-balance')).toBeTruthy()
})

test('LevelIcon (1)', () => {
  const wrapper =  mount(<LevelIcon level={1} />)

  expect(wrapper.find('p').text()).toBe('Level 1')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-dice-one')).toBeTruthy()
})

test('LevelIcon (2)', () => {
  const wrapper =  mount(<LevelIcon level={2} />)

  expect(wrapper.find('p').text()).toBe('Level 2')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-dice-two')).toBeTruthy()
})

test('LevelIcon (3)', () => {
  const wrapper =  mount(<LevelIcon level={3} />)

  expect(wrapper.find('p').text()).toBe('Level 3')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-dice-three')).toBeTruthy()
})

test('LevelIcon (4)', () => {
  const wrapper =  mount(<LevelIcon level={4} />)

  expect(wrapper.find('p').text()).toBe('Level 4')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-dice-four')).toBeTruthy()
})

test('LevelIcon (5)', () => {
  const wrapper =  mount(<LevelIcon level={5} />)

  expect(wrapper.find('p').text()).toBe('Level 5')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-dice-five')).toBeTruthy()
})

test('LevelIcon (6)', () => {
  const wrapper =  mount(<LevelIcon level={6} />)

  expect(wrapper.find('p').text()).toBe('Level 6')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-dice-six')).toBeTruthy()
})

test('RecruitCountIcon (multiple)', () => {
  const wrapper =  mount(<RecruitCountIcon amount={6} />)

  expect(wrapper.find('p').text()).toBe('You have 6 Recruits')

  expect(wrapper.find('span').text()).toBe('6')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-double-team')).toBeTruthy()
})

test('RecruitCountIcon (single)', () => {
  const wrapper =  mount(<RecruitCountIcon amount={1} />)

  expect(wrapper.find('p').text()).toBe('You have 1 Recruit')

  expect(wrapper.find('span').text()).toBe('1')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-double-team')).toBeTruthy()
})

test('SpellCountIcon (single)', () => {
  const wrapper =  mount(<SpellCountIcon amount={1} />)

  expect(wrapper.find('p').text()).toBe('You know 1 Spell')

  expect(wrapper.find('span').text()).toBe('1')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-book')).toBeTruthy()
})

test('SpellCountIcon (multiple)', () => {
  const wrapper =  mount(<SpellCountIcon amount={6} />)

  expect(wrapper.find('p').text()).toBe('You know 6 Spells')

  expect(wrapper.find('span').text()).toBe('6')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-book')).toBeTruthy()
})

test('WeaponAvailableIcon (hasWeapon multiple available)', () => {
  const wrapper =  mount(<WeaponAvailableIcon amount={2} hasWeapon={{icon: 'fake-icon', name: 'Fake Weapon'}}/>)

  expect(wrapper.find('p').text()).toBe('Fake Weapon')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('fake-icon')).toBeTruthy()
})

test('WeaponAvailableIcon (hasWeapon single available)', () => {
  const wrapper =  mount(<WeaponAvailableIcon amount={1} hasWeapon={{icon: 'fake-icon', name: 'Fake Weapon'}}/>)

  expect(wrapper.find('p').text()).toBe('Fake Weapon')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('fake-icon')).toBeTruthy()
})

test('WeaponAvailableIcon (no weapon, single available)', () => {
  const wrapper =  mount(<WeaponAvailableIcon amount={1} hasWeapon={null}/>)

  expect(wrapper.find('p').text()).toBe('1 Weapon Available')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-hand')).toBeTruthy()
})

test('WeaponAvailableIcon (no weapon, multiple available)', () => {
  const wrapper =  mount(<WeaponAvailableIcon amount={2} hasWeapon={null}/>)

  expect(wrapper.find('p').text()).toBe('2 Weapons Available')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-hand')).toBeTruthy()
})

test('WeaponIcon', () => {
  const wrapper =  mount(<WeaponIcon name={'Fake Weapon'} />)
  expect(wrapper.find('span').first().text()).toBe('Fake WeaponFake Class Weapon')

  expect(wrapper.find('span').last().text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('fake-icon')).toBeTruthy()
})

test('SpellElementIcon (Life)', () => {
  const wrapper =  mount(<SpellElementIcon element={'Life'} />)
  expect(wrapper.find('p').text()).toBe('Life Spell')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-zigzag-leaf')).toBeTruthy()
})

test('SpellElementIcon (Fire)', () => {
  const wrapper =  mount(<SpellElementIcon element={'Fire'} />)
  expect(wrapper.find('p').text()).toBe('Fire Spell')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-fire')).toBeTruthy()
})

test('SpellElementIcon (Shadow)', () => {
  const wrapper =  mount(<SpellElementIcon element={'Shadow'} />)
  expect(wrapper.find('p').text()).toBe('Shadow Spell')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-bleeding-eye')).toBeTruthy()
})

test('SpellElementIcon (Arcane)', () => {
  const wrapper =  mount(<SpellElementIcon element={'Arcane'} />)
  expect(wrapper.find('p').text()).toBe('Arcane Spell')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-crystal-ball')).toBeTruthy()
})

test('SpellIcon small', () => {
  const wrapper =  mount(<SpellIcon spell={{
    name: 'Test Spell',
    icon: 'fake-icon'
  }} />)

  expect(wrapper.find('p').text()).toBe('Test Spell')

  expect(wrapper.find('span').text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('fake-icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-fw')).toBeTruthy()
})

test('ZodiacIcon small', () => {
  const wrapper =  mount(<ZodiacIcon zodiac={'Aries'} />)

  expect(wrapper.find('span').first().text()).toBe('Aries+10% Health+10% Power+10% Speed')

  expect(wrapper.find('span').last().text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('fake-icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-fw')).toBeTruthy()
})

test('ZodiacIcon large', () => {
  const wrapper =  mount(<ZodiacIcon zodiac={'Aries'} isLarge={true} />)

  expect(wrapper.find('span').first().text()).toBe('Aries+10% Health+10% Power+10% Speed')

  expect(wrapper.find('span').last().text()).toBe('')

  expect(wrapper.find('i').hasClass('icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra')).toBeTruthy()
  expect(wrapper.find('i').hasClass('fake-icon')).toBeTruthy()
  expect(wrapper.find('i').hasClass('ra-lrg')).toBeTruthy()
})
