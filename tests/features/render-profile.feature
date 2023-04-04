Feature: Profile View

    Scenario: Handles missing profiles
        Given I have stored a profile "PROFILE_DEFAULT"
        And I navigate to "/profile/missing"

        Then the h1 contains "404"
        And the router-view contains "Profile not found!"


    Scenario: Renders an existing profile
        Given I have stored a profile "PROFILE_DEFAULT"
        And I navigate to "/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46"

        Then the h1 contains "Profile: Default Profile"
        And there is a BigCard with label "gmail:home"
        And there is a BigCard with label "gdrive:home"
        And it renders the default row for the bookmark "gmail" and the row "home"

    Scenario Outline: Switches between different bookmark rows
        Given I have stored a profile "PROFILE_DEFAULT"
        And I navigate to "/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46"

        When I hover the bookmark "gmail"
        And I <action> <direction_up>
        Then it renders the default row for the bookmark "gmail" and the row "home"

        When I <action> <direction_down>
        Then it renders the default row for the bookmark "gmail" and the row "work"

        When I <action> <direction_down>
        Then it renders the default row for the bookmark "gmail" and the row "work"

        When I <action> <direction_up>
        Then it renders the default row for the bookmark "gmail" and the row "home"

        Examples:
            | action | direction_up | direction_down |
            | scroll | "up"         | "down"         |
            | press  | "ArrowUp"    | "ArrowDown"    |
            | press  | "w"          | "s"            |

    Scenario: Sets the focus following the mouse pointer
        Given I have stored a profile "PROFILE_DEFAULT"
        And I navigate to "/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46"

        When I hover the bookmark "gmail"
        And I hover the bookmark "gdrive"
        And I scroll "down"
        Then it renders the default row for the bookmark "gmail" and the row "home"
