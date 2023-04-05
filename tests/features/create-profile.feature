Feature: Create Profile

    Scenario: Renders a visual editor with defaults
        Given I navigate to "/"

        Then the h1 contains "Create a new Profile"

        When I mouse hover the container "root"
        Then the current path tooltip reads "root"


    Scenario: Builds a complex profile and navigates to it
        Given I navigate to "/"

        When I click the container "root"
        And I select the option "Add container" from the Container Modal
        And I click the "Confirm" button
        And I mouse hover the container "root > row:0"
        Then the current path tooltip reads "root > row:0"

        When I click the container "root"
        And I select the option "Add container" from the Container Modal
        And I click the "Confirm" button
        And I mouse hover the container "root > row:1"
        Then the current path tooltip reads "root > row:1"

        When I click the container "root > row:0"
        And I select the option "Add container" from the Container Modal
        And I click the "Confirm" button
        And I mouse hover the container "root > row:0 > row:0"
        Then the current path tooltip reads "root > row:0 > row:0"

        When I click the container "root > row:0"
        And I select the option "Add container" from the Container Modal
        And I click the "Confirm" button
        And I mouse hover the container "root > row:0 > row:1"
        Then the current path tooltip reads "root > row:0 > row:1"

        When I click the container "root > row:0"
        And I select the option "Transform in a column" from the Container Modal
        And I click the "Confirm" button
        And I mouse hover the container "root > row:0 > column:0"
        Then the current path tooltip reads "root > row:0 > column:0"

        When I click the container "root > row:0 > column:0"
        And I select the option "Add bookmark" from the Container Modal
        And I type in the fields
            | label            | value                                                                         | nth |
            | Label            | gmail                                                                         | -1  |
            | Icon             | https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg | -1  |
            | Title (Optional) | home                                                                          | 0   |
            | URL              | https://mail.google.com/mail/u/0/#inbox                                       | 0   |
        And I click the "Add Row" button
        And I type in the fields
            | label            | value                                   | nth |
            | Title (Optional) | work                                    | 1   |
            | URL              | https://mail.google.com/mail/u/0/#inbox | 1   |
        And I click the "Confirm" button
        And I mouse hover the container "root > row:0 > column:0 > bookmark:gmail"
        Then the current path tooltip reads "root > row:0 > column:0 > bookmark:gmail"

        When I click the container "root > row:0 > column:1"
        And I select the option "Add bookmark" from the Container Modal
        And I type in the fields
            | label            | value                                                                     | nth |
            | Label            | gdrive                                                                    | -1  |
            | Icon             | https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png | -1  |
            | Title (Optional) | home                                                                      | 0   |
            | URL              | https://drive.google.com/drive/my-drive                                   | 0   |
        And I click the "Confirm" button
        And I mouse hover the container "root > row:0 > column:1 > bookmark:gdrive"
        Then the current path tooltip reads "root > row:0 > column:1 > bookmark:gdrive"

        And I click the "Commit" button
        Then the page URL matches "/profile/[\w-]+"
