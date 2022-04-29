This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Leximon

## Pages
[http://localhost:3000/]
[http://localhost:3000/pokemon]
[http://localhost:3000/create]
[http://localhost:3000/edit?data={id}]
[http://localhost:3000/profile]
[http://localhost:3000/register]
[http://localhost:3000/login]
[http://localhost:3000/impressum]

### Abstract

This project deals with the popular franchise Pokémon. It implements the concept of the Pokédex. Data of Pokémon is saved in a JSON file and accessed while realizing CRUD functionalities. Users can be registered and login in order to gain access to editing privileges. Pokémon are visualized as cards which can be viewed, created, edited and deleted. Users are able to upload images as to change the pictures on the Pokécards. All sites are designed following the mobile-first strategy.

### Homepage

The homepage will display four random Pokémon and can be accessed by anyone. The navigation is realized as a "burger" menu. Any other interaction requires the user to login. Upon logging in, users are able to click on the pictures to view the respective card in single view. Every card provides links to edit or delete it. 

### Create a new Pokémon

Pokémon can be created using a form. Only the name is required and a default picture is set as to avoid render issues. New images can be uploaded and set for the current picture. On submission, the user is redirected to the newly created Pokémon. Editing a Pokémon is the same form with the exception that the card data is already filled in the form.

### Catch Em!

Here, users can browse through all the Pokémon and search for specific ones by name. This page is pre-rendered using getStaticProps.


## Conclusion

By working with this project I was able to learn a lot about front-end web design. At the beginning I tended to overload pages with code, but as I went on I learned to implement functionalities using components. This was helpful to extract single functionalities and maintain comprehensive coding. What I value the most is the experience I gained in working with JSON and API. The next step would be to implement a MySQL server. Due to my lack of ability in designing the pages may not look compelling. I used CSS mostly for realizing responsiveness.

## Testing

| Section         | Content                          |
| --------------- | -------------------------------- |
| ID              | T-01                             |
| Prerequisites   | [http://localhost:3000/]         |
| Procedure       | Press F5                         |
| Expected result | Four random Pokémon are rendered |

| Section         | Content                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| ID              | T-02                                                                     |
| Prerequisites   | [http://localhost:3000/pokemon]                                          |
| Procedure       | Type Pikachu in the searchbar                                            |
| Expected result | All Pokémon are filtered as the word is typed until only Pikachu remains |

| Section         | Content                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| ID              | T-03                                                                     |
| Prerequisites   | [http://localhost:3000/login]                                          |
| Procedure       | Make sure you are logged out --> Menu Logout <br> Login using Email : admin@admin, Password: adminadmin                                           |
| Expected result | User is logged in as admin@admin |

