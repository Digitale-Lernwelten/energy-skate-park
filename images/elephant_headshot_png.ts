/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAACXBIWXMAAAsSAAALEgHS3X78AAANwUlEQVR4nO1beXCT55n/Sd+n49N9WJYsH/KNwTGGQCCM7a5TsrbjAUMhhnXISdJklyUzpN12M7NbZtLZP+jsdMuk7GzTZJK0nRwdIFOSLjHZbZsssAldwAcQ40v4PiRLtu7DlrR/yBI6vk/6PrezgJffjGf0Hs/rxz8/7/sc7yteJBLBfaSDf6cVuFtxnxgG3CeGAfeJYcB9YhhwnxgG3CeGAeSdVuD/ErubGuuDwcXNsbZQKLj8m88+v0A3l/f/IcDb2/JNU7mp8Iwp31Cr06jj/Vb7PEYnZ3qGRsd3ne78/WiizKon5mB7W2tlcdFbZaaCPKY5gyNjA1eu32xKJGdVb6VDT7YffbC66u/0ORp5pnkVxUWVDpfnDIANsb5Ve/i+1LHn3S211a9lIyWGteUltTu3N+yPtVclMUee6+h8tG7LM1JKzFpGSomh06gbYu1VR8zhp/adqttU27wS2UAw6I59XlXE7NzesH/z+nV7E/uWgkH43W4Efb6Msh6fH063pyvWXjWH7xNtzS80N2z7l9j2iUTC8DkcWAwEAACkUAghRTHKD5hHhz/53flfx9r3PDG7mxrri/Pz/rGpYVtzIikeux2hpaX4PB6Pl3Ed24IjKdC7J4nZ3dRYL6XEOwoM+pam+q1JQRsABNzuJFIAgE8KMq65uLQUP192NzXW31PEHNjVcoyJjBjCoRACXm9aPykUZlzb4XLPPFb3UH1JvuHY1pqqunsi8j3Y3tZqyNG+vrF6TVm2uYPDZuTKJGn9EpUKAhGz+/7siy9hVMtQqNeBTxB3/1Y62N7W+mB11YdsAzW7w0VLTGhxCQIRs9zGmiq47XYAUau7q9317qbGei6kXO8fQnGulnYsvLSYUVanUcPhD8bbd7XFrCkxnchGyqx1DrNWGyLhMEoNOQiHQrTzloJB2v5EkILbBzRni+lo3f7F7qbGeq5yXLFze8P+teUltXRjFpsNX13pwRcXLsFunYNJq0SxTs1ICgBEIpGsQZ5ep4Xd5QHAkZg9j9T9fPummm8U5uacf6Kt+QUuslzwRFvzCyZjXjtdrjNrnUPA7cXaAj02VJhg1KpYr+t3ORGJhBnHdRo17M6o1+a0lUQiQRAA5BIKayvL3nz56f3un/7y1x9yWYMOz+/b9YpcKmmWSSUbSILQNzVsw8jEVNo8i82GoNcHhThzTMKESCSCgNsNsVxBO+7x+UGJom6dEzG5alULABAkAZ1GjSnF3HEAKybm0JPtRzUqxaGGhzbq2WTC09MWFOvo4xe2CHi9EFAUCJqAb2RiCgU50fVZb6W/3bfzZ2UFeWWD41NYv64KAFBuKtSvZEudPHFM9fcvPdO9pbb6tdqqClakuL1eiAiC66+ihd/lou1PjJZZW4xYKHwSANTanHiflBJjwemWcVHq6MvfbgDw6eaatVIucqPjkyjQ0G8BrlgKBqOxSgrRMZfOJwj2FnPp60GpJxxBWUlRvM/j80OlkLkziCXh6MvfbpBJqLM1a8o4kQIAwUB2d8sFdO47tBi1GIIk2ROjz835QXlJcVLfyMQU3v/43Fts5I8817FeJqHOlhQaWVmYNKVEEAktMcxcGVJdu9U+D40iqhqfFLAnRiQUzHh8/qS+BafrHHt54S/ZkgIAxSlF/XUVZfD6A2zFOcNim4dGHjVkQsDBYsQi0YbEQ3JkYhoAvs9G9tCT7UeZgjW24BMEJOIMyc6fETwenz0xRr3u8dhnj88Pi83+xvF3PuhlI6tRKQ5xKUzTQfBnJoXHz1y4YkXMgV0tx2qrKvSxdt/QrZ5/fvNXf81G9vl9u14pNxXqs8/MDB6Pn7E0yRVpJYiE8gsrr7S35Zummsryp2PtnpuDs5tr1jayVUAulTT/qdYSg0jKKTJgXkciSXPVoYTDmBUxOWrVa7HrzVvjU24+j9/efvjVBbZKyKSSDdlnsQOfICCSpNdauIAgSYhk6QSneqmMxBxsb2utXVvxDBA9V6Ys1p/98KdvnmerxMkTx1QkQSRtox+98QtY7ax5TYNIJsta2GYCQZKQajTg8ZL/bI/PDxGRvGZGYgw52tdjtdW+oVs9x9/54HtcFHnn1CfPVleUxtv//oeLuHL9Jt478ymXZZLA4/EZk8DMcjxQSmUaKQBgHh2HUZOcpTMS81LHnndjNVarfR5en/8YV2XUSrkhsW3MjaYTcinnwDcJQopKOyMygcfjQarR0CaOFpsdcgGRNBdgIGZ3U2N9zZryPbH2xLRleCXlBZlEkkTMxuo1eOThzXh+XxvXpdIglrOqdmYkxWqfx/zcHNQJNeLYbQJtElmgzz2SWFIcnZo+xU3tKCixyJDa9zcH9tJN5QyBSAxSKEzKeXg8HoSS29ZICEgQpIDWusxjE+AvBmFQJW9LctmN0xKjUSlbYp9HJqah06jfX4nyIqEwjZhURCJh2n3PBmK5HG6b7fbvk8kgkmTeph6fH0PDt6BXyECl3CYQJBmPldI02rm9YX9pUX58dY/PB7YRbipEQmF5pvFwKAS3zZaxVpsJBCkApVAufyazkmIem8DYyAiKdWpQouStxScIUErl7XaqcCgUzksMyJZCodmVKH3kuY71cmlmTf0uJ8KhEHxOB6e1E5NZIUVBolIl/VF06P26HxJE0rwPKRSCUigh02qTzqGsNpwah7CF0+15MTVDTsRiwB9/ibAUDGIx4Gecm4rUerBAJKY9XGPo/bofJq0ybiVCioJMq4VSb4BUrYGQotK2M6vNffLEMfal+GUYcrQtTGOxJxoA0H1zCLYFJ2O5kQ7FBcZYdp8V5tHxpJtJIUWBUigzEgmwIKa6ohS/+Y/PX2WlxTJefnr/XxXk5TLeM/scDkQiEdgWnBDzo1cibo+X1aUYEC2pAsDI+GTGeebRcUh4iFsKnyDiZ1I2pBFz9vOLx28MmpP6Cgx6xv8+HeRSyT8xvUYIeD3xLTQ+PQOZWASFSADzxBQW/ZkvxBIhFpKYHJvAwJCZdry3byCJFACsSQEYLCYYXBxObJvyDbXff/HpF9ks+IPDz39cWWqitZagzxffMqPTs/B5bxMh5AHTMxa2emP41hgeKDdBLiBwtasXvX0D6O0bQPf1Plzt6oVJo0gihSDJrE9BEkFLjNvrG0ps6zRq5KhVP16u8NPi5IljqiPPdXSWmQp30pUZQkuL8LucAACvP4DhiZnvjM5afxQblwhIWO0LrF23iIyqLhGLUGbMhUmjgEmjQIlOjTJjbtp8rvkVLTF2m+31iZT9W1JolMkk1NmXOva8m3gYH2xvaz381L5T1/qHJ+o21dLWXhYDfnjsdsTe4nQPmE+/3/mHn/znleuv3pq2eGLzgsEAK2JmLFZoZOzyLT5BQKJScbIWIMOT+e89u9+9obpKSlc1uzFoRjC4OEySpMGg00iZzhMgeqYkepw/3ug/9/OPPo2fWY9/Y0vnAyWFzQBgdftQX/dw1j+iq+caSg062jGCJCGUSMEnCPD4PFrvMzBoRnFBXsaKIOOF2/DYxJFCneZNbW5u2gLLpYSMr5tSX00C6aQAgMcfHALA+l1uJBLO6L1EMlnGl1MAUFFejMuXu1BVUgSBSARyOe9K/B2M7vqj3198q3vAfNrndCDg9TBNo4Xf7YbLao2T4vUH8N+9fadTSQEAu8sdP8/4BD9rkfqz//rKV5CbwzjOJu/i8fioqqrE2NQsAl4vPPN2OGZn4j9OiyVzHGOxL3zXPDkz4He54Jm3Z/xPhUOhKCFzVgQ87vh5MjZjcX917eZ33j5z7nFG4WUIhaKMgZfVPo8w8Hj3gPl0trWyQS6Xo6jEhPFZK+14xrvr356/NLqjYWsTgM9K8w2VS0H7bbcX+88sm3bq81HbghP9Y5OnLfaF7/72/KXR9NXTsRRmfrsCAJev9f3r2yc/Pgvg7CsH9sxUlxalpStcElK5XA51Tg5sC05oU8sP2YRj5MzY5n+8pih/r1alSCMhEX23xj3zLnfn9Jz9+KcX/4f222OJyFUpNgCA1eHCpoe3Ms67eKXn3NsnPz4caw+OTW6VikVfFhv1SQlZaDEIcLhmyTfmYXIKaeRwes76WN1D9TqV8gWlLFr5F4uEtf5AsAcAHG5v96R1rvt3f+w+znpBAAcerRuqyDeULSxFULdtS9q4x+fHl1d7f/HGBx89mzrW0dLYur685EOdWimPXd9KKTEUudzz3oGBQchFwvht5x1951tfs6Z+c2Xp+QifQO2mjZCnxCZdN/qHrw0M/UPiG/9UdLQ0tpYYDT8pzTdU2hac8AYCqKwoX9Hl3NWuHpQZo6TeUWKaH1r/SXm+YUdldTWMeVGFYt9TnJiZ7XzvTCer5HVHw1ZTkUH3XlVxYR0A2F0eVD+wjrM+oaVFXO3qRWVR/p0lZudfbIt867FH4Q8GMWWZm11wuC5MzFqOM32zNRueaHnklfLCvB/mqJQyu9eH6rVVnNcwDwwCkcidJeZge1urw+V+MBQOf75SMlKxo2GriSD4/yanqMfKS4pQvY4bOU7LLG6OjK/eb9E+9Zf1M5RYrK9eXxPfpmzgmbfj6o3+u/vJ/J+COYf7lFGjRN/XfZxlRUIOL6ruNbh8vg8X3F4YFFJcutyVXWAZBEkiR6lYvcRcuNZ/wepwDgPAwtwce0EeH1rVKiYGAOxOTycAFGhVrK0mlsSuamIcHu95fzD6dpet1cSS2P8FFGkAMMAge28AAAAASUVORK5CYII=';
export default image;